<template>
	<code-btn v-bind="$props" :code="isLedOn ? 'M150 Y0' : 'M150 Y255'" :color="isLedOn ? 'error' : 'success'" :title="$t('button.leds.title')">
		<v-icon class="mr-1">lightbulb</v-icon> {{ ledText }}
	</code-btn>
</template>

<script>
'use strict'

import {mapState} from 'vuex'
import VBtn from 'vuetify/es5/components/VBtn'

export default {
    computed: {
        ...mapState('machine/model', ['leds']),
        isLedOn() {
            return this.leds.value > 0
        },
        ledText() {
			return this.$t(this.leds.value ? 'button.leds.captionOff' : 'button.leds.captionOn');
		}
    },
	extends: VBtn
}
</script>