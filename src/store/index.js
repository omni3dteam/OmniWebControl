'use strict'

import Vue from 'vue'
import Vuex from 'vuex'

import machine, { defaultMachine } from './machine'
import connector from './machine/connector'
//import observer from './observer.js'
import settings from './settings.js'

import i18n from '../i18n'
import Plugins from '../plugins'
import { logGlobal } from '../plugins/logging.js'

import { InvalidPasswordError } from '../utils/errors.js'

Vue.use(Vuex)

const defaultUsername = ''
const defaultPassword = 'reprap'

const machines = {
	[defaultMachine]: machine(defaultMachine)
}

const store = new Vuex.Store({
	state: {
		isConnecting: false,
		isDisconnecting: false,
		connectionStates: [],
		isLocal: (location.hostname === 'localhost') || (location.hostname === '127.0.0.1') || (location.hostname === '[::1]'),
		connectDialogShown: false,
		passwordRequired: false,
		selectedMachine: defaultMachine
	},
	getters: {
		connectedMachines: () => Object.keys(machines).filter(machine => machine !== defaultMachine),
		isConnected: state => state.selectedMachine !== defaultMachine && !state.machine.isReconnecting,
		uiFrozen: (state, getters) => state.isConnecting || state.isDisconnecting || !getters.isConnected
	},
	actions: {
		// Connect to the given hostname using the specified credentials
		async connect({ state, commit}, { hostname = location.host, username = defaultUsername, password = defaultPassword } = {}) {
			if (!hostname || hostname === defaultMachine) {
				throw new Error('Invalid hostname');
			}
			if (state.machines.hasOwnProperty(hostname)) {
				throw new Error(`Host ${hostname} is already connected!`);
			}
			if (state.isConnecting) {
				//TODO is in state connecting
				throw new Error('Already connecting');
			}

			//commit('setConnecting', true);
			commit('setConnectionState',{host: hostname, state:'connecting'})
			try {
				const connectorInstance = await connector.connect(hostname, username, password);
				const moduleInstance = machine(hostname, connectorInstance);
				commit('addMachine', { hostname, moduleInstance });
				connectorInstance.register(moduleInstance);

				//commit('setSelectedMachine', hostname);
				//logGlobal('success', i18n.t('events.connected', [hostname]));

				// if (state.isLocal) {
				// 	commit('settings/setLastHostname', hostname);
				// 	commit('settings/setLastHostnamePass', hostname);
				// }

				// await dispatch('machine/settings/load');
				// await dispatch('machine/cache/load');

				// if (state.settings.lastHostnamePass != hostname)
				// {
				// 	commit('settings/setLastHostnamePass', hostname);
				// }
				commit('setConnectionState',{host: hostname, state:'connected'})
			} catch (e) {
				if (!(e instanceof InvalidPasswordError) || password !== defaultPassword)  {
					logGlobal('error', i18n.t('error.connect', [hostname]), e.message);
					commit('setConnectionState',{host: hostname, state:'failed'})
				}
				if (e instanceof InvalidPasswordError) {
					commit('askForPassword');
				}
			}
			
		},

		// Disconnect from the given hostname
		async disconnect({ state, commit, dispatch }, { hostname = state.selectedMachine, doDisconnect = true } = {}) {
			console.log("disconnecting "+hostname)
			if (!hostname || hostname === defaultMachine) {
				throw new Error('Invalid hostname');
			}
			if (!state.machines.hasOwnProperty(hostname)) {
				throw new Error(`Host ${hostname} is already disconnected!`);
			}
			if (state.isDisconnecting) {
				throw new Error('Already disconnecting');
			}

			if (doDisconnect) {
				//commit('setDisconnecting', true);
				commit('setConnectionState',{host: hostname, state:'disconnecting'})
				try {
					await dispatch(`machines/${hostname}/disconnect`);
					logGlobal('success', i18n.t('events.disconnected', [hostname]));
					// Disconnecting must always work - even if it does not always happen cleanly
				} catch (e) {
					logGlobal('warning', i18n.t('error.disconnect', [hostname]), e.message);
					console.warn(e);
				}
				//commit('setDisconnecting', false);
				commit('setConnectionState',{host: hostname, state:'disconnected'})
			}
			commit(`machines/${hostname}/unregister`);

			if (state.selectedMachine === hostname) {
				commit('setSelectedMachine', defaultMachine);
			}
			commit('removeMachine', hostname);
		},

		// Disconnect from every host
		async disconnectAll({ dispatch }) {
			for (let hostname in machines) {
				if (hostname !== defaultMachine) {
					// Don't do this via await because we don't have much time...
					dispatch('disconnect', { hostname });
				}
			}
		},

		// Called when a machine cannot stay connected
		async onConnectionError({ state, dispatch, commit }, { hostname, error }) {
			if (error instanceof InvalidPasswordError) {
				logGlobal('error', i18n.t('events.connectionLost', [hostname]), error.message);
				await dispatch('disconnect', { hostname, doDisconnect: false });
				commit('askForPassword');
			} else if (state.isLocal) {
				logGlobal('error', i18n.t('events.connectionLost', [hostname]), error.message);
				await dispatch('disconnect', { hostname, doDisconnect: false });
			} else {
				logGlobal('warning', i18n.t('events.reconnecting', [hostname]), error.message);
				dispatch(`machines/${hostname}/reconnect`);
			}
		}
	},
	mutations: {
		showConnectDialog: state => state.connectDialogShown = true,
		hideConnectDialog(state) {
			state.connectDialogShown = false;
			state.passwordRequired = false;
		},
		askForPassword(state) {
			state.connectDialogShown = true;
			state.passwordRequired = true;
		},

		setConnecting: (state, connecting) => state.isConnecting = connecting,
		setConnectionState(state, data) {
			const hostname = data.host
			const newState = data.state
			state.connectionStates[hostname] = newState
		},
		addMachine(state, { hostname, moduleInstance }) {
			machines[hostname] = moduleInstance;
			this.registerModule(['machines', hostname], moduleInstance);
		},
		setDisconnecting: (state, disconnecting) => state.isDisconnecting = disconnecting,
		removeMachine(state, hostname) {
			this.unregisterModule(['machines', hostname]);
			delete machines[hostname];
		},

		setSelectedMachine(state, selectedMachine) {
			this.unregisterModule('machine');
			this.registerModule('machine', machines[selectedMachine]);
			state.selectedMachine = selectedMachine
		}
	},

	modules: {
		// machine will provide the currently selected machine
		machines: {
			namespaced: true,
			modules: {
				[defaultMachine]: machines[defaultMachine] 				// This represents the factory defaults
				// ... other machines are added as sub-modules to this object
			}
		},
		settings
	},
	plugins: [
		connector.installStore,
		//observer,
		Plugins.installStore
	],
	strict: process.env.NODE_ENV !== 'production'
})

// This has to be registered dynamically, else unregisterModule will not work cleanly
store.registerModule('machine', machines[defaultMachine])

export default store
