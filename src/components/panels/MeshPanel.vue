<template>
	<v-card>
		<v-card-title class="pb-1">
			<v-icon small class="mr-1">grid_on</v-icon> {{ $t('panel.mesh.caption') }}
		</v-card-title>

        <v-card-text>
            <v-layout row shrink>
                <v-layout column align-center>
                    <v-switch class="mt-0" hide-details v-model="meshSwitch" :disabled=isDisabled() :label="$t('panel.mesh.labelMesh')"></v-switch>
                </v-layout>
                <v-layout column align-center>
                    <v-switch class="mt-0" hide-details v-model="hvcSwitch" :disabled=isDisabledHVC() :label="$t('panel.mesh.labelHVC')"></v-switch>
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
		...mapState('machine/model', ['state', 'printMesh', 'printHVC']),
        meshSwitch: {
            get() {
                return this.printMesh.value
            },
            set(value) {
                if (value === true)
                {
                    this.sendCode('M782 R1 S1')
                }
                else
                {
                    this.sendCode('M782 R0 S1')
                }
            }
        },
        hvcSwitch: {
            get() {
                if (this.printMesh === 1)
                {
                    return true
                }
                else
                {
                    return this.printHVC.value
                }
            },
            set(value) {
                if (value === true)
                {
                    this.sendCode('M782 C1 S1')
                }
                else
                {
                    this.sendCode('M782 C0 S1')
                }
            }
        }
	},
    methods: {
        ...mapActions('machine', ['sendCode']),
        isDisabled() {
            return this.uiFrozen || !((this.state.status === 'idle') || (this.state.status === 'paused'))
        },
        isDisabledHVC() {
            return this.printMesh.value === 1 || this.isDisabled() === true
        }
	}
}
</script>
