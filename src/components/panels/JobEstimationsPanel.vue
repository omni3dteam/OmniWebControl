<template>
	<v-card>
		<v-card-title>
			<v-icon small class="mr-1">watch_later</v-icon> {{ $t('panel.jobEstimations.caption') }}
		</v-card-title>
		<v-card-text class="pt-0 text-xs-center">
			<v-layout row wrap>

				<v-flex v-show="!state.isSimulating">
					<v-layout column>
						<v-flex tag="strong">
							{{ $t('panel.jobEstimations.smart') }}
						</v-flex>
						<v-flex>
							{{$displayTime(smartEstimate)}}
						</v-flex>
					</v-layout>
				</v-flex>
				
			</v-layout>
		</v-card-text>
	</v-card>
</template>

<script>
'use strict'

import { mapState, mapGetters } from 'vuex'

export default {
	computed: {...mapState('machine/model', ['job', 'state']),
	...mapGetters('machine/model',[
		'jobProgress',
		'smartEstimate'
	])}
}
</script>
