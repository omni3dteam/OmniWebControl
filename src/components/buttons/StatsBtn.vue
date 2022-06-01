<template>
	<div>
		<v-btn v-bind="$props" @click="downloadStats" :disabled="$props.disabled || !canDownload" :loading="isBusy" :title="$t(`button.stats.title`)" :color="innerColor" tabindex="0">
			<template slot="loader">
				<v-progress-circular indeterminate :size="23" :width="2" class="mr-2"></v-progress-circular>
				{{ caption }}
			</template>
			<v-icon class="mr-1">info</v-icon> {{ caption }}
		</v-btn>
	</div>
</template>

<script>
'use strict'

import VBtn from 'vuetify/es5/components/VBtn'
import saveAs from 'file-saver'
import { mapState, mapGetters, mapActions } from 'vuex'
import { DisconnectedError, OperationCancelledError } from '../../utils/errors.js'
import Path from '../../utils/path.js'

export default {
	computed: {
		...mapState(['isLocal']),
		...mapState('machine/model', ['machineSN']),
		...mapGetters(['isConnected', 'uiFrozen']),
		...mapGetters('machine/model', ['board']),
		caption() {
			return this.$t(`button.stats.caption`);
		},
		canDownload() {
			return this.isConnected && !this.uiFrozen;
		},
		isBusy() {
			return this.innerLoading;
		}
	},
	data() {
		return {
			innerColor: this.color,
			innerLoading: false,
		}
	},
	extends: VBtn,
	props: {
		target: {
			type: String,
			required: true
		},
	},
	methods: {
		...mapActions('machine', {
			machineDownload: 'download',
		}),
		async downloadStats() {
			try {
                const filename = 'print-statistics.csv';
                const blob = await this.machineDownload({ filename: Path.combine('sys', filename), type: 'blob' });
                saveAs(blob, filename);
            }
            catch (e) {
                console.log(e)
                if (!(e instanceof DisconnectedError) && !(e instanceof OperationCancelledError)) {
					// should be handled before we get here
					console.warn(e);
				}
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
