<template>
	<v-dialog v-model="shown" persistent  max-width="800">
		<v-card>
			<v-card-text>
				<center class="headline">{{ procedureBox.procedureName }}</center>
			</v-card-text>

			<v-card-text>
				<center>
					{{ procedureBox.stepName }}
				</center>
			</v-card-text>
			<v-card-text>
				<center>
					STEP: {{ procedureBox.step_current }} / {{ procedureBox.step_total}}
				</center>
			</v-card-text>

			<v-card-actions v-if="procedureBox.buttons">
				<v-spacer></v-spacer>
				
				<v-btn v-if="procedureBox.buttons === 1 || procedureBox.buttons === 3" color="blue darken-1" flat @click="ok">
					{{ $t('generic.ok') }}
				</v-btn>
				
				<v-btn v-if="procedureBox.buttons === 2 || procedureBox.buttons === 3" color="blue darken-1" flat @click="cancel">
					{{ $t('generic.cancel') }}
				</v-btn>
				
				<v-btn v-if="procedureBox.buttons === 4" color="blue darken-1" flat @click="yes">
					{{ $t('generic.yes') }}
				</v-btn>
				
				<v-btn v-if="procedureBox.buttons === 4" color="blue darken-1" flat @click="no">
					{{ $t('generic.no') }}
				</v-btn>
				
				<v-spacer></v-spacer>
			</v-card-actions>
		</v-card>
		<v-card height=60></v-card>
		<center><v-card><emergency-btn></emergency-btn></v-card></center>
	</v-dialog>
</template>

<script>
'use strict'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
	computed: {
		// no need to observe isConnected here because the default machine instance never displays a procedureBox anyway
		...mapState('machine/model', ['procedureBox', 'move']),
		...mapState('machine/settings', ['moveFeedrate']),
		...mapGetters('machine/settings', ['moveSteps', 'numMoveSteps']),
		displayedAxes() {
			const axisControls = this.procedureBox.axisControls;
			return this.move.axes.filter((axis, index) => axis.visible && axisControls.indexOf(index) !== -1);
		}
	},
	data() {
		return {
			shown: false,
			persistent: false
		}
	},
	methods: {
		...mapActions('machine', ['sendCode']),
		getMoveCellClass(index) {
			let classes = '';
			if (index === 0 || index === this.numAxsSteps - 1) {
				classes += 'hidden-md-and-down';
			}
			if (index > 1 && index < 5 && index % 2 === 1) {
				classes += 'hidden-sm-and-down';
			}
			return classes;
		},
		ok() {
			this.shown = false;
			this.sendCode('M392 P0');
		},
		cancel() {
			this.shown = false;
			this.sendCode('M392 P1');
		},
		yes() {
			this.shown = false;
			this.sendCode('M392 P0');
		},
		no() {
			this.shown = false;
			this.sendCode('M392 P1');
		}
	},
	watch: {
		procedureBox: {
			deep: true,
			handler(to) {
				this.shown = (to.buttons !== null);
				this.persistent = (to.buttons === 1);
			}
		}
	}	
}
</script>

