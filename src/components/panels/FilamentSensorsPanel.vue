<template>
	<v-card>
		<v-card-title class="pb-1">
			<v-icon small class="mr-1">build</v-icon> {{ $t('panel.filamentSensors.caption') }}
		</v-card-title>

        <v-card-text>
            <v-layout row>

                <template v-for="(value, index) in filSensors">
                    <v-flex :key=index>
                        <center>
                            {{ $t('panel.filamentSensors.name', [index]) }}
                        </center>
                        <v-flex class="ma-1">
                            <code-btn block color="success" :code="`M98 P/sys/procedures/filament-sensor-enable-t${index}.g`" :disabled="isEnableVisible(index)">
                                <v-icon class="mr-1">check</v-icon> {{ $t('panel.filamentSensors.enable') }}
                            </code-btn>
                        </v-flex>

                        <v-flex shrink class="hidden-sm-and-down px-1"></v-flex>

                        <v-flex class="ma-1">
                            <code-btn block color="error" :code="`M98 P/sys/procedures/filament-sensor-disable-t${index}.g`" :disabled="isDisableVisible(index)">
                                <v-icon class="mr-1">clear</v-icon> {{ $t('panel.filamentSensors.disable') }}
                            </code-btn>
                        </v-flex>
                    </v-flex>

                    <v-flex v-if="index < (filSensors.length - 1)" :key="index" shrink class="hidden-sm-and-down px-1"></v-flex>
                    
                </template>
                


            </v-layout>
        </v-card-text>
	</v-card>
</template>

<script>
'use strict'

import { mapState, mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters(['uiFrozen']),
		...mapState('machine/model', ['state', 'filSensors']),
    },
    methods: {
		isSensorOn(index) {
            return this.filSensors[index] === 1
        },
        isEnableVisible(index) {
            return this.uiFrozen || this.isSensorOn(index) || !((this.state.status === 'idle') || (this.state.status === 'paused'))
        },
        isDisableVisible(index) {
            return this.uiFrozen || !(this.isSensorOn(index)) || !((this.state.status === 'idle') || (this.state.status === 'paused'))
        }
	}
}
</script>
