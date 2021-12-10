<template>
	<v-card>
		<v-card-text>
			<template v-if="isConnected">
				<template v-if="electronics.firmware.name">
					{{ $t('panel.settingsElectronics.firmware', [$display(electronics.firmware.version)]) }}
				</template>
			</template>
			<template v-else>
				(not connected)
			</template>
		</v-card-text>
		<v-card-text class="pt-0">
			<a href="https://github.com/omni3dteam/OmniWebControl" target="_blank">Omni Web Control 2.5.0</a>
		</v-card-text>

		<v-card-text class="pt-0">
			{{ $t('panel.settingsAbout.developedBy') }} <a href="mailto:chr.hammacher@gmail.com">Christian Hammacher</a> {{ $t('panel.settingsAbout.for') }} <a href="https://www.omni3d.com" target="_blank">Omni3D</a>
			<br/>
			{{ $t('panel.settingsAbout.licensedUnder') }} <a href="https://www.gnu.org/licenses/gpl-3.0.en.html" target="_blank">GNU General Public License v3</a>
		</v-card-text>
	</v-card>
</template>

<script>
'use strict'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
	computed: {
		...mapGetters(['isConnected']),
		...mapState('machine/model', ['electronics', 'network'])
	},
	methods: {
		...mapActions('machine', ['sendCode']),
		async diagnostics() {
			await this.sendCode('M122');
			this.$router.push('/Console');
		}
	}
}
</script>
