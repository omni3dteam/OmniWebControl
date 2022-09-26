<style scoped>
table {
	width: 100%;
	border-spacing: 0;
}

table td,
table th {
	text-align: center;
}

table.tools th,
table.tools td {
	width: 20%;
}

</style>

<template>
	<v-card v-if="funkcja()">
		<v-card-title class="pb-0">
			<panel-link  class="mr-1">
				<v-icon small>build</v-icon> {{ $t('panel.dryer.caption') }}
			</panel-link>
		</v-card-title>

		<v-card-text class="pa-0">
			<template>
				<table class="tools">
					<tbody>
						<template>
							<template>
								<tr>
									<th>
										<a>
											{{ $t('panel.dryer.label') }}
										</a>
									</th>
									<td class="text-center">
										<span>
											{{ (parseFloat(heat.dryer.current)).toFixed(1) + " C" }}
										</span>
									</td>
                                    <td class="pl-2 pr-1">
                                        <v-combobox id="dryerInput" ref="input" type="number" v-model="value2" @keyup.enter="apply"></v-combobox>
									</td>
								</tr>
							</template>
						</template>
					</tbody>
				</table>
			</template>
		</v-card-text>
	</v-card>
</template>

<script>
'use strict'
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState('machine/model', ['heat', 'state', 'spindles', 'tools', 'dryer']),
        
    },
	data() {
		return {
			value1: 0,
			value2: 0,
			given_value: 0,
			applying: false
		}
	},
    methods: {
        ...mapActions('machine', ['sendCode']),
        funkcja(){
            if ((this.heat.dryer.active !== null) && (parseFloat(this.heat.dryer.active) > (-273.0))){
				this.value2 = this.heat.dryer.active
                return true 
            }
            else{
                return false
            }
        },
        apply(){
			const field = document.querySelector("#dryerInput").value
			this.value1 = field
            this.sendCode('M118 P4 S"set1,'+this.value1+'"')
			this.$refs.input.isMenuActive = false;
			}
        },
    }
</script>
