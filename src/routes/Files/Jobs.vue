<template>
	<v-layout column>
		<v-card>
			<v-layout>
				<v-flex sm12 md6 lg4 xl3>
					<v-select v-model="currentPrinter" :items="printers" class="ml-2"></v-select>
				</v-flex>
			</v-layout>

		</v-card>
		<job-file-list></job-file-list>
	</v-layout>
</template>

<script>
'use strict'

import { mapMutations, mapState } from 'vuex'


export default {
	computed: {
		...mapState(['machines','selectedMachine']),
		...mapState('settings',['hosts']),
		printers() {
			return this.hosts
				//.filter(host => Object.keys(this.machines).includes(host.hostname))
				.map(host => {
					return {
						text: host.name ? 
							`${host.name} (${host.hostname})` :
							`${ Object.keys(this.machines).includes(host.hostname) ? 
								this.machines[host.hostname].model.network.name :
								''
							} (${host.hostname})`,
						value: host.hostname,
						disabled: !Object.keys(this.machines).includes(host.hostname)
					}
				})
		},
		currentPrinter: {
			get() { return this.selectedMachine },
			set(value) { 
				console.log(value)
				this.setSelectedMachine(value)
			}
		}
	},
	data() {
		return {
			//currentPrinter: undefined
		}
	},
	methods: {
		...mapMutations(['setSelectedMachine']),
	},
	// watch: {
	// 	currentPrinter(to) { console.log(to) }
	// }
}
</script>

