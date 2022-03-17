<template>
	<v-menu offset-y v-if="storages.length > 1" v-tab-control.dynamic>
		<v-btn slot="activator" color="success">
			<template v-if="storageIndex !== 2">
				<v-icon class="mr-1">sd_storage</v-icon> {{ $t('generic.sdCard', [storageIndex]) }} <v-icon class="ml-1">arrow_drop_down</v-icon>
			</template>
			<template v-else>
				<v-icon class="mr-1">usb</v-icon> {{ "USB" }} <v-icon class="ml-1">arrow_drop_down</v-icon>
			</template>
		</v-btn>

		<v-list ref="list">
			<v-list-tile v-for="(storage, index) in storages" :key="index" @click="$emit('storageSelected', index)" v-tab-control>
				<template v-if="index !== 2">
					<v-icon class="mr-1">{{ storage.mounted ? 'done' : 'clear' }}</v-icon>
					{{ $t('generic.sdCard', [index]) }} ({{ $t(storage.mounted ? 'generic.mounted' : 'generic.notMounted') }})
				</template>
				<template v-else>
					<v-icon class="mr-1">usb</v-icon> {{ "USB" }}
				</template>
			</v-list-tile>
		</v-list>
	</v-menu>
</template>

<script>
'use strict'

import { mapState } from 'vuex'

export default {
	props: {
		directory: {
			type: String,
			required: true
		}
	},
	computed: {
		...mapState('machine/model', ['storages']),
		storageIndex() {
			const matches = /^(\d+)/.exec(this.directory);
			if (matches) {
				return parseInt(matches[1]);
			}
			return 0;
		}
	}
}
</script>
