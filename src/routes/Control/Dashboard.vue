<template>
	<v-layout row wrap>
		<v-flex xs12 sm8 md8 lg9 xl9>
			<v-layout column>
			
				<v-flex xs12 sm12 md12 lg12>
						<movement-panel></movement-panel>
				</v-flex>
				<v-flex d-flex>
						<fan-panel></fan-panel>
				</v-flex>	
			
				<v-layout row wrap>
					<v-flex xs12 sm12 md6 lg6>
						<extrude-panel></extrude-panel>
					</v-flex>
					<v-flex d-flex xs12 sm12 md6 lg6>
						<speed-factor-panel></speed-factor-panel>
					</v-flex>
				</v-layout>
	
			</v-layout>
		</v-flex>

		<v-flex sm4 md4 lg3 xl3>
			<macro-list></macro-list>
			<v-flex d-flex>
				<webcam-panel></webcam-panel>
			</v-flex>
			<v-flex xs12 sm12 md12>
				<job-control-panel></job-control-panel>
			</v-flex>
			
			
		</v-flex>
	</v-layout>
</template>
