<template>
	<v-card>
		<v-card-title class="pb-1">
			<v-icon small class="mr-1">build</v-icon> {{ $t('panel.filamentSensors.caption') }}
		</v-card-title>

        <v-card-text>
            <v-layout row shrink>
                <v-layout column align-center>
                    <v-switch class="mt-0" hide-details v-model="leftSensorState" :disabled="isDisabled" :label="$t('panel.filamentSensors.nameLeft')"></v-switch>
                </v-layout>

                <v-layout column align-center>
                    <v-switch class="mt-0" hide-details v-model="rightSensorState" :disabled="isDisabled" :label="$t('panel.filamentSensors.nameRight')"></v-switch>
                </v-layout>
            </v-layout>
        </v-card-text>
	</v-card>
</template>

<script>
'use strict'

import { mapActions, mapState, mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters(['uiFrozen']),
		...mapState('machine/model', ['state', 'filSensors']),
        leftSensorState: {
            get() {
                return this.filSensors[0]
            },
            set(value) {
                if (value === true)
                {
                    this.sendCode('M98 P/sys/procedures/filament-sensor-enable-t0.g')
                }
                else
                {
                    this.sendCode('M98 P/sys/procedures/filament-sensor-disable-t0.g')
                }
            }
        },
        rightSensorState: {
            get() {
                return this.filSensors[1]
            },
            set(value) {
                if (value === true)
                {
                    this.sendCode('M98 P/sys/procedures/filament-sensor-enable-t1.g')
                }
                else
                {
                    this.sendCode('M98 P/sys/procedures/filament-sensor-disable-t1.g')
                }
            }
        },
        isDisabled() {
            return this.uiFrozen || !((this.state.status === 'idle') || (this.state.status === 'paused'))
        }
    },
    methods: {
        ...mapActions('machine', ['sendCode'])
	}
}
</script>
