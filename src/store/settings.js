'use strict'

import i18n from '../i18n'

import { localStorageSupported, getLocalSetting, setLocalSetting, removeLocalSetting } from '../utils/localStorage.js'
import patch from '../utils/patch.js'
//import Path from '../utils/path.js'

export default {
	namespaced: true,
	state: {
		language: 'en',
		lastHostname: "<defaultip>",
		lastHostnamePass: location.host,
		darkTheme: true,
		hosts: [],
		useBinaryPrefix: true,
		settingsStorageLocal: false,
		settingsSaveDelay: 2000,						// ms - how long to wait before settings updates are saved
		cacheStorageLocal: localStorageSupported,
		cacheSaveDelay: 4000,							// ms - how long to wait before cache updates are saved
		notifications: {
			errorsPersistent: true,
			timeout: 5000								// ms
		},
		webcam: {
			url: '',
			updateInterval: 5000,						// ms
			useFix: false,								// do not append extra HTTP qualifier when reloading images
			embedded: false,							// use iframe to embed webcam stream
			rotation: 0,
			flip: 'none'
		}
	},
	mutations: {
		load(state, payload) {
			if (payload.language && i18n.locale != payload.language) {
				i18n.locale = payload.language;
			}
			patch(state, payload, true);
		},
		addOrEditPrinter(state, payload) {
			const hostname = payload.hostname
			const name = payload.name || undefined

			//is ip in existing record
			const index = state.hosts.findIndex(host => host.hostname === hostname)
			if (index >= 0) {
				//patch exisiting
				if (name) state.hosts[index].name = name
			} else {
				//create new
				state.hosts.push({
					hostname: hostname,
					name: name
				})
			}
			
		},
		removePrinter(state, hostname) {
			state.hosts = state.hosts.filter(host => host.hostname !== hostname)
		},
		setLastHostname(state, hostname) {
			state.lastHostname = hostname;
			setLocalSetting('lastHostname', hostname);
		},
		setLastHostnamePass(state, hostname) {
			state.lastHostnamePass = hostname;
			setLocalSetting('lastHostnamePass', hostname);
		},

		update(state, payload) {
			if (payload.language) {
				i18n.locale = payload.language;
			}
			patch(state, payload, true);
		}
	},
	actions: {
		async load({ rootState, rootGetters, commit, dispatch }) {
			// First attempt to load the last hostname from the local storage if the are running on localhost
			if (rootState.isLocal) {
				const lastHostname = getLocalSetting('lastHostname');
				if (lastHostname) {
					commit('load', { lastHostname });
				}
			}

			// Attempt to load the global settings from the local storage
			const settings = getLocalSetting('settings');
			if (settings) {
				commit('load', settings);
			} else if (rootGetters.isBackendConnected) {
				// Otherwise try to load the settings from the selected board
				dispatch('backend/settings/load', undefined, { root: true });
			}
		},
		async save({ state, rootGetters, dispatch }) {
			// See if we need to save everything in the local storage
			if (state.settingsStorageLocal) {
				setLocalSetting('settings', state);
			} else {
				// If not, remove the local settings again
				removeLocalSetting('settings');

				// And try to save everything on the selected board
				if (rootGetters.isBackendConnected) {
					dispatch('backend/settings/save', undefined, { root: true });
				}
			}
		},
		async reset() {
			// do nothing
		}
	}
}
