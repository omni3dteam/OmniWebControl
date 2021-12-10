<template>
	<v-card>
		<v-card-title class="pb-1">
			<v-icon small class="mr-1">grid_on</v-icon> {{ $t('panel.mesh.caption') }}
		</v-card-title>

        <v-card-text>
            <v-layout row>
                <v-flex class="ma-1">
                    <code-btn block color="success" code="M782 S1" :disabled="uiFrozen || isMeshOn || !(state.status === 'idle')">
                        <v-icon class="mr-1">grid_on</v-icon> {{ $t('panel.mesh.enable') }}
                    </code-btn>
                </v-flex>

                <v-flex shrink class="hidden-sm-and-down px-1"></v-flex>

                <v-flex class="ma-1">
                    <code-btn block color="error" code="M782 S0" :disabled="uiFrozen || !isMeshOn || !(state.status === 'idle')">
                        <v-icon class="mr-1">grid_off</v-icon> {{ $t('panel.mesh.disable') }}
                    </code-btn>
                </v-flex>
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
		...mapState('machine/model', ['state', 'printMesh']),
		isMeshOn() {
            return this.printMesh.value === 1
        }
	}
}
</script>
