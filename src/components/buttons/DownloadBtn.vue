<template>
	<div>
		<v-btn v-bind="$props" @click="downloadLog" :disabled="$props.disabled || !canDownload" :loading="isBusy" :title="$t(`button.download['${target}'].title`)" :color="innerColor" tabindex="0">
			<template slot="loader">
				<v-progress-circular indeterminate :size="23" :width="2" class="mr-2"></v-progress-circular>
				{{ caption }}
			</template>
			<v-icon class="mr-1">archive</v-icon> {{ caption }}
		</v-btn>
		
		<download-log-dialog :shown.sync="showDialog" ></download-log-dialog>
	</div>
</template>

<script>
'use strict'

import JSZip from 'jszip'
import VBtn from 'vuetify/es5/components/VBtn'
import saveAs from 'file-saver'
import { mapState, mapGetters, mapActions } from 'vuex'
import { DisconnectedError, OperationCancelledError } from '../../utils/errors.js'
import Path from '../../utils/path.js'

const notAllowedExtensions = ['.bin', '.json']

export default {
	computed: {
		...mapState(['isLocal']),
		...mapGetters(['isConnected', 'uiFrozen']),
		...mapGetters('machine/model', ['board']),
		caption() {
			return this.$t(`button.download['${this.target}'].caption`);
		},
		canDownload() {
			return this.isConnected && !this.uiFrozen;
		},
		destinationDirectory() {
			return Path.log;
		},
		isBusy() {
			return this.innerLoading;
		}
	},
	data() {
		return {
			waitingForCode: false,
			innerColor: this.color,
			innerLoading: false,
			innerGeneration: false,
			innerFilelist: [],
			showDialog: false,
		}
	},
	extends: VBtn,
	props: {
		directory: String,
		target: {
			type: String,
			required: true
		},
		uploadPrint: Boolean,
		noWait: Boolean
	},
	methods: {
		...mapActions('machine', {
			machineDownload: 'download',
			getFileList: 'getFileList',
			sendCode: 'sendCode',
		}),
		isFileAcceptable(filename) {
			if (notAllowedExtensions.some(extension => filename.toLowerCase().endsWith(extension))) {
				return false;
			}
			return true;
		},
		async sendRequest(gCode) {
			if (!this.waitingForCode) {
				this.waitingForCode = !this.noWait;
				try {
					await this.sendCode({ code: gCode, showSuccess: !this.noWait });
				} catch (e) {
					// handled before we get here
				}
				this.waitingForCode = false;
			}
		},
		async loadDirectory(directory) {
			if (!this.isConnected || this.innerLoading) {
				return;
			}
			
			this.innerLoading = true;
			try {
				// Load file list and create missing props
				const files = await this.getFileList(directory);
				this.innerFilelist = files;

			} catch (e) {
				if (!(e instanceof DisconnectedError)) {
					console.warn(e);
					this.$makeNotification('error', this.$t('error.filelistRequestFailed'), e.message);
				}
			}
			this.innerLoading = false;	
		},
		async downloadZIP() {
			if (!this.isConnected) {
				return;
			}
			var directory = this.destinationDirectory;
			
			// loadDirectory
			await this.loadDirectory(directory);

			// Download files
			const zip = new JSZip();
			for (let i = 0; i < this.innerFilelist.length; i++) {
				if (this.isFileAcceptable(this.innerFilelist[i].name) && !this.innerFilelist[i].isDirectory)
				{
					try {
						const blob = await this.machineDownload({ filename: Path.combine(directory, this.innerFilelist[i].name), type: 'blob', num: i + 1, count: this.innerFilelist.length });
						zip.file(this.innerFilelist[i].name, blob);
					} catch (e) {
						if (!(e instanceof DisconnectedError) && !(e instanceof OperationCancelledError)) {
							// should be handled before we get here
							console.warn(e);
						}
						this.innerGeneration = false;
						return;
					}
				}
			}
			
			var subfolder = "user-procedures";
			directory = this.destinationDirectory + "/" + subfolder;
			await this.loadDirectory(directory);
			
			for (let i = 0; i < this.innerFilelist.length; i++) {
				if (this.isFileAcceptable(this.innerFilelist[i].name) && !this.innerFilelist[i].isDirectory)
				{
					try {
						const blob = await this.machineDownload({ filename: Path.combine(directory, this.innerFilelist[i].name), type: 'blob', num: i + 1, count: this.innerFilelist.length });
						zip.folder(subfolder).file(this.innerFilelist[i].name, blob);
					} catch (e) {
						if (!(e instanceof DisconnectedError) && !(e instanceof OperationCancelledError)) {
							// should be handled before we get here
							console.warn(e);
						}
						this.innerGeneration = false;
						return;
					}
				}
			}
			
			subfolder = "procedures";
			directory = this.destinationDirectory + "/" + subfolder;
			await this.loadDirectory(directory);
			
			for (let i = 0; i < this.innerFilelist.length; i++) {
				if (this.isFileAcceptable(this.innerFilelist[i].name) && !this.innerFilelist[i].isDirectory)
				{
					try {
						const blob = await this.machineDownload({ filename: Path.combine(directory, this.innerFilelist[i].name), type: 'blob', num: i + 1, count: this.innerFilelist.length });
						zip.folder(subfolder).file(this.innerFilelist[i].name, blob);
					} catch (e) {
						if (!(e instanceof DisconnectedError) && !(e instanceof OperationCancelledError)) {
							// should be handled before we get here
							console.warn(e);
						}
						this.innerGeneration = false;
						return;
					}
				}
			}
			
			subfolder = "macros/Preheat";
			directory = this.destinationDirectory + "/" + subfolder;
			await this.loadDirectory(directory);
			
			for (let i = 0; i < this.innerFilelist.length; i++) {
				if (this.isFileAcceptable(this.innerFilelist[i].name) && !this.innerFilelist[i].isDirectory)
				{
					try {
						const blob = await this.machineDownload({ filename: Path.combine(directory, this.innerFilelist[i].name), type: 'blob', num: i + 1, count: this.innerFilelist.length });
						zip.folder(subfolder).file(this.innerFilelist[i].name, blob);
					} catch (e) {
						if (!(e instanceof DisconnectedError) && !(e instanceof OperationCancelledError)) {
							// should be handled before we get here
							console.warn(e);
						}
						this.innerGeneration = false;
						return;
					}
				}
			}
			
			subfolder = "macros/Maintenance";
			directory = this.destinationDirectory + "/" + subfolder;
			await this.loadDirectory(directory);
			
			for (let i = 0; i < this.innerFilelist.length; i++) {
				if (this.isFileAcceptable(this.innerFilelist[i].name) && !this.innerFilelist[i].isDirectory)
				{
					try {
						const blob = await this.machineDownload({ filename: Path.combine(directory, this.innerFilelist[i].name), type: 'blob', num: i + 1, count: this.innerFilelist.length });
						zip.folder(subfolder).file(this.innerFilelist[i].name, blob);
					} catch (e) {
						if (!(e instanceof DisconnectedError) && !(e instanceof OperationCancelledError)) {
							// should be handled before we get here
							console.warn(e);
						}
						this.innerGeneration = false;
						return;
					}
				}
			}
			
			subfolder = "macros/Maintenance/Other";
			directory = this.destinationDirectory + "/" + subfolder;
			await this.loadDirectory(directory);
			
			for (let i = 0; i < this.innerFilelist.length; i++) {
				if (this.isFileAcceptable(this.innerFilelist[i].name) && !this.innerFilelist[i].isDirectory)
				{
					try {
						const blob = await this.machineDownload({ filename: Path.combine(directory, this.innerFilelist[i].name), type: 'blob', num: i + 1, count: this.innerFilelist.length });
						zip.folder(subfolder).file(this.innerFilelist[i].name, blob);
					} catch (e) {
						if (!(e instanceof DisconnectedError) && !(e instanceof OperationCancelledError)) {
							// should be handled before we get here
							console.warn(e);
						}
						this.innerGeneration = false;
						return;
					}
				}
			}
			
			subfolder = "macros/Filament";
			directory = this.destinationDirectory + "/" + subfolder;
			await this.loadDirectory(directory);
			
			for (let i = 0; i < this.innerFilelist.length; i++) {
				if (this.isFileAcceptable(this.innerFilelist[i].name) && !this.innerFilelist[i].isDirectory)
				{
					try {
						const blob = await this.machineDownload({ filename: Path.combine(directory, this.innerFilelist[i].name), type: 'blob', num: i + 1, count: this.innerFilelist.length });
						zip.folder(subfolder).file(this.innerFilelist[i].name, blob);
					} catch (e) {
						if (!(e instanceof DisconnectedError) && !(e instanceof OperationCancelledError)) {
							// should be handled before we get here
							console.warn(e);
						}
						this.innerGeneration = false;
						return;
					}
				}
			}
			
			subfolder = "machine-specific";
			directory = this.destinationDirectory + "/" + subfolder;
			await this.loadDirectory(directory);
			
			for (let i = 0; i < this.innerFilelist.length; i++) {
				if (this.isFileAcceptable(this.innerFilelist[i].name) && !this.innerFilelist[i].isDirectory)
				{
					try {
						const blob = await this.machineDownload({ filename: Path.combine(directory, this.innerFilelist[i].name), type: 'blob', num: i + 1, count: this.innerFilelist.length });
						zip.folder(subfolder).file(this.innerFilelist[i].name, blob);
					} catch (e) {
						if (!(e instanceof DisconnectedError) && !(e instanceof OperationCancelledError)) {
							// should be handled before we get here
							console.warn(e);
						}
						this.innerGeneration = false;
						return;
					}
				}
			}
			
			// hide dialog message
			this.showDialog = false;

			// Compress files and save the new archive
			const notification = this.$makeNotification('info', this.$t('notification.compress.title'), this.$t('notification.compress.message'));
			try {
				const zipBlob = await zip.generateAsync({ type: 'blob' });
				saveAs(zipBlob, 'log.zip');
			} catch (e) {
				console.warn(e);
				this.$makeNotification('error', this.$t('notification.compress.errorTitle'), e.message);
			}
			notification.hide();
			this.innerGeneration = false;
		},
		async downloadLog() {
			if (!this.innerGeneration)
			{
				this.innerGeneration = true;
				// send g-Code request
				this.sendRequest("M122 S1");
				
				// show dialog message
				this.showDialog = true;
				
				// download ZIP file when it's ready
				setTimeout(function () { this.downloadZIP() }.bind(this), 2000);
			}
		}
	},
	watch: {
		isConnected(to) {
			if (to && !this.isLocal && this.updates.codeSent && this.updates.webInterface) {
				// Reload the web interface when the connection could be established again
				location.reload();
			}
		}
	}
}
</script>
