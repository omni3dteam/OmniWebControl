// Polling connector dedicated for backend connection
'use strict'

import axios from 'axios'

import BaseConnector from './BaseConnector.js'
import { FileInfo } from '../modelItems.js'

import {
	NetworkError, DisconnectedError, TimeoutError, OperationCancelledError, OperationFailedError,
	DirectoryNotFoundError, FileNotFoundError, DriveUnmountedError,
	LoginError, InvalidPasswordError, NoFreeSessionError,
} from '../../../utils/errors.js'
import { strToTime, timeToStr } from '../../../utils/time.js'

export default class BackendConnector extends BaseConnector {
	static async connect(hostname, username, password) {
		let response;
		try {
			const cameraUrl = `http://${hostname.replace("<defaultip>", location.host)}/api/connect`;
			response = await axios.get(cameraUrl, {
				params: {
					password,
					time: timeToStr(new Date())
				}
			});
		} catch (e) {
			if (e.response) {
				throw e;
			}
			throw new NetworkError();
		}

		switch (response.data.err) {
			case 0: return new BackendConnector(hostname, password, response.data);
			case 1: throw new InvalidPasswordError();
			case 2: throw new NoFreeSessionError();
			default: throw new LoginError(`Unknown err value: ${response.data.err}`)
		}
	}

	axios = null
	cancelSource = BaseConnector.getCancelSource()

	justConnected = true
	isReconnecting = false
	name = null
	password = null
	boardType = null
	sessionTimeout = null

	updateLoopTimer = null
	updateLoopCounter = 1
	lastStatusResponse = { seq: 0 }

	pendingCodes = []
	fileTransfers = []
	layers = []
	currentFileInfo = new FileInfo()
	printStats = {}
	messageBoxShown = false;
	procedureBoxShown = false;

	constructor(hostname, password, responseData) {
		super(hostname);
		this.password = password;
		this.boardType = responseData.boardType;
		this.sessionTimeout = responseData.sessionTimeout;

		this.axios = axios.create({
			baseURL: `http://${hostname}/api/`,
			cancelToken: this.cancelSource.token,
			timeout: 8000	// default session timeout in RepRapFirmware
		});
	}

	async reconnect() {
		// Cancel pending requests
		this.cancelSource.cancel(new DisconnectedError());
		this.fileTransfers.forEach(transfer => transfer.cancel(new DisconnectedError()));
		this.fileTransfers = [];
		this.pendingCodes.forEach(code => code.reject(new DisconnectedError()));
		this.pendingCodes = [];

		// Attempt to reconnect
		try {
			const response = await axios.get(`http://${this.hostname}/api/connect`, {
				params: {
					password: this.password,
					time: timeToStr(new Date())
				},
				timeout: 2000
			});

			switch (response.data.err) {
				case 0:
					this.justConnected = true;
					this.boardType = response.data.boardType;
					this.sessionTimeout = response.data.sessionTimeout;
					this.cancelSource = BaseConnector.getCancelSource()
					this.axios.defaults.cancelToken = this.cancelSource.token;
					this.axios.defaults.timeout = response.data.sessionTimeout / (this.settings.ajaxRetries + 1)
					//this.scheduleUpdate();
					break;
				case 1:
					this.dispatch('onConnectionError', new InvalidPasswordError());
					break;
				case 2:
					this.dispatch('onConnectionError', new NoFreeSessionError());
					break;
				default:
					this.dispatch('onConnectionError', new LoginError(`Unknown err value: ${response.data.err}`))
					break;
			}
		} catch (e) {
			const that = this;
			setTimeout(async function() {
				await that.reconnect();
			}, 1000);
		}
	}

	register(module) {
		super.register(module);

		// Apply axios defaults
		const that = this;
		this.axios.defaults.timeout = this.sessionTimeout / (this.settings.ajaxRetries + 1)
		this.axios.interceptors.response.use(null, error => {
			if (axios.isCancel(error)) {
				return Promise.reject(error || new OperationCancelledError());
			}

			if (error.response && error.response.status === 404) {
				return Promise.reject(new FileNotFoundError(error.config && error.config.filename));
			}

			if (!that.isReconnecting && error.config && (!error.config.isFileTransfer || error.config.data.byteLength <= this.settings.fileTransferRetryThreshold)) {
				if (!error.config.retry) {
					error.config.retry = 0;
				}

				if (error.config.retry < this.settings.ajaxRetries) {
					error.config.retry++;
					return this.axios.request(error.config);
				}
			}

			if (error.response) {
				if (error.message && error.message.startsWith('timeout')) {
					return Promise.reject(new TimeoutError());
				}
				return Promise.reject(error);
			}

			return Promise.reject(new NetworkError());
		});

		// Ideally we should be using a ServiceWorker here which would allow us to send push
		// notifications even while DWC2 is running in the background. However, we cannot do
		// this because ServiceWorkers require secured HTTP connections, which are no option
		// for standard end-users. That is also the reason why they are disabled in the build
		// script, which by default is used for improved caching
		this.scheduleUpdate();
	}

	async disconnect() {
		await this.axios.get('disconnect');
	}

	unregister() {
		if (this.updateLoopTimer) {
			clearTimeout(this.updateLoopTimer);
			this.updateLoopTimer = null;
		}

		this.cancelSource.cancel(new DisconnectedError());
		this.fileTransfers.forEach(transfer => transfer.cancel(new DisconnectedError()));
		this.pendingCodes.forEach(code => code.reject(new DisconnectedError()));

		super.unregister();
	}

	async updateLoop() {
	
		const response = await this.axios.get(`status`);
		//const newData = {};

		this.store.commit(`backend/model/update`, {printq: response.data })

		//this.lastStatusResponse = response.data;
		this.justConnected = false;
		//this.updateLoopCounter++;
		this.scheduleUpdate();

	}

	scheduleUpdate( now=false) {
		if (this.justConnected || this.updateLoopTimer) {
			const that = this;
			// Perform status update
			this.updateLoopTimer = setTimeout(async function() {
				try {
					/* eslint-disable no-useless-call */
					await that.updateLoop.call(that);
				} catch (e) {
					if (!(e instanceof DisconnectedError)) {
						if (that.isReconnecting) {
							that.updateLoopTimer = undefined;
							that.reconnect();
						} else {
							console.warn(e);
							that.dispatch('onConnectionError', e);
						}
					}
				}
			}, this.justConnected || now ? 500 : 2000);
		}
	}

	async sendCode(code) {
		await this.axios.get('code', {
			params: { code: code }
		});

		clearTimeout(this.updateLoopTimer)
		this.scheduleUpdate( true )

		return ''

		// if (response.data.buff === undefined) {
		// 	console.warn(`Received bad response for rr_gcode: ${JSON.stringify(response.data)}`);
		// 	throw new CodeResponseError();
		// }
		// if (response.data.buff === 0) {
		// 	throw new CodeBufferError();
		// }

		// const pendingCodes = this.pendingCodes, seq = this.lastStatusResponse.seq;
		// return new Promise((resolve, reject) => pendingCodes.push({ seq, resolve, reject }));
	}

	upload({ filename, content, cancelSource = axios.cancelToken.source(), onProgress }) {
		const that = this;
		return new Promise(function(resolve, reject) {
			// Create upload options
			const payload = (content instanceof(Blob)) ? content : new Blob([content]);
			const options = {
				cancelToken: cancelSource.token,
				isFileTransfer: true,
				onUploadProgress: onProgress,
				params: {
					name: filename,
					time: timeToStr(content.lastModified ? new Date(content.lastModified) : new Date())
				},
				timeout: 0,
				transformRequest(data, headers) {
					delete headers.post['Content-Type'];
					return data;
				}
			};

			try {
				// Create file transfer and start it
				that.axios.post('upload', payload, options)
					.then(function(response) {
						resolve(response);
						that.dispatch('onFileUploaded', { filename, content });
					})
					.catch(reject)
					.then(function() {
						that.fileTransfers = that.fileTransfers.filter(item => item !== cancelSource);
					});

				// Keep it in the list of transfers
				that.fileTransfers.push(cancelSource);
			} catch (e) {
				reject(e);
			}
		});
	}

	async delete(filename) {
		const response = await this.axios.get('delete', {
			params: { name: filename }
		});

		if (response.data.err) {
			throw new OperationFailedError(`err ${response.data.err}`);
		}

		await this.dispatch('onFileOrDirectoryDeleted', filename);
	}

	async move({ from, to, force, silent }) {
		const response = await this.axios.get('move', {
			params: {
				old: from,
				new: to,
				deleteexisting: force ? 'yes' : 'no'
			}
		});

		if (!silent) {
			if (response.data.err) {
				throw new OperationFailedError(`err ${response.data.err}`);
			}

			await this.dispatch('onFileOrDirectoryMoved', { from, to, force });
		}
	}

	async makeDirectory(directory) {
		const response = await this.axios.get('mkdir', {
			params: { dir: directory }
		});

		if (response.data.err) {
			throw new OperationFailedError(`err ${response.data.err}`);
		}

		await this.dispatch('onDirectoryCreated', directory);
	}

	download(payload) {
		const filename = (payload instanceof Object) ? payload.filename : payload;
		const type = (payload instanceof Object) ? payload.type : undefined;
		const cancelSource = (payload instanceof Object && payload.cancelSource) ? payload.cancelSource : BaseConnector.getCancelSource();
		const onProgress = (payload instanceof Object) ? payload.onProgress : undefined;

		const that = this;
		return new Promise(function(resolve, reject) {
			// Create download options
			const options = {
				cancelToken: cancelSource.token,
				responseType: (type === 'text') ? 'arraybuffer' : type,	// responseType: 'text' is broken, see https://github.com/axios/axios/issues/907
				isFileTransfer: true,
				onDownloadProgress: onProgress,
				params: {
					name: filename
				},
				timeout: 0
			};

			try {
				// Create file transfer and start it
				that.axios.get('download', options)
					.then(function(response) {
						if (type === 'text') {
							// see above...
							response.data = Buffer.from(response.data).toString();
						}
						resolve(response.data);
						that.dispatch('onFileDownloaded', { filename, content: response.data });
					})
					.catch(reject)
					.then(function() {
						that.fileTransfers = that.fileTransfers.filter(item => item !== cancelSource);
					});

				// Keep it in the list of transfers and return the promise
				that.fileTransfers.push(cancelSource);
			} catch (e) {
				reject(e);
			}
		});
	}

	async getFileList(directory) {
		let fileList = [], next = 0;
		do {
			const response = await this.axios.get('filelist', {
				params: {
					dir: directory,
					first: next
				}
			});	

			if (response.data.err === 1) {
				throw new DriveUnmountedError();
			} else if (response.data.err === 2) {
				throw new DirectoryNotFoundError(directory);
			}

			fileList = fileList.concat(response.data.files);
			next = response.data.next;
		} while (next !== 0);

		return fileList.map(item => ({
			isDirectory: item.type === 'd',
			name: item.name,
			size: (item.type === 'd') ? null : item.size,
			lastModified: strToTime(item.date)
		}));
	}

	async getFileInfo(filename) {
		const response = await this.axios.get('fileinfo', {
			params: filename ? { name: filename } : {}
		});

		if (response.data.err) {
			throw new OperationFailedError(`err ${response.data.err}`);
		}
		delete response.data.err;

		return new FileInfo(response.data);
	}
}
