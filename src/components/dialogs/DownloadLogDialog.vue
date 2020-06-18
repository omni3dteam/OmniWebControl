<template>
	<v-dialog :shown.sync="innerShown" v-model="shown" persistent width="360">
		<v-card>
			<v-card-title>
				<span class="headline">{{ $t('dialog.downloadLog.title') }}</span>
			</v-card-title>

			<v-card-text>
				<center>
					{{ $t('dialog.downloadLog.prompt') }}
				</center>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
'use strict'

import { mapGetters, mapActions } from 'vuex'

import Path from '../../utils/path.js'
import { DisconnectedError } from '../../utils/errors.js'

export default {
	props: {
		shown: {
			type: Boolean,
			required: true
		},
		directory: {
			type: String,
			required: true
		},
		title: String,
		prompt: String,
		showSuccess: {
			type: Boolean,
			default: true
		},
		showError: {
			type: Boolean,
			default: true
		}
	},
	computed: mapGetters(['isConnected']),
	data() {
		return {
			innerShown: this.shown
		}
	},
	methods: {
		...mapActions('machine', ['makeDirectory']),
		async createDirectory(directory) {
			const currentDirectory = this.directory;
			try {
				const path = Path.combine(currentDirectory, directory);
				await this.makeDirectory(path);

				this.$emit('directoryCreated', path);
				if (this.showSuccess) {
					this.$makeNotification('success', this.$t('notification.newDirectory.successTitle'), this.$t('notification.newDirectory.successMessage', [directory]));
				}
			} catch (e) {
				if (!(e instanceof DisconnectedError)) {
					console.warn(e);
					this.$emit('directoryCreationFailed', e);
					if (this.showError) {
						this.$makeNotification('error', this.$t('notification.newDirectory.errorTitle'), e.message);
					}
				}
			}
		}
	},
	watch: {
		isConnected(to) {
			if (!to) {
				this.innerShown = false;
			}
		},
		innerShown(to) {
			if (this.shown !== to) {
				this.$emit('update:shown', to);
			}
		},
		shown(to) {
			if (this.innerShown !== to) {
				this.innerShown = to;
			}
		}
	}
}
</script>
