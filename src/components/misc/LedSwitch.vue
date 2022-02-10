<template>
    <v-layout row shrink>
        <v-switch hide-details v-model="switchState" label="LED"></v-switch>
    </v-layout>
</template>

<script>
'use strict'

import {mapActions, mapState} from 'vuex'

export default {
    computed: {
        ...mapState('machine/model', ['leds']),
        isLedOn() {
            return this.leds.value > 0
        },
        switchState: {
            get() { return this.leds },
            set(value) { this.sendCode(value ? 'M150 Y255' : 'M150 Y0') }
		}
    },
    methods: {
        ...mapActions('machine', ['sendCode'])
	}
}
</script>