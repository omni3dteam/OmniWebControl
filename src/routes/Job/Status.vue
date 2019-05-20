<template>
	<v-layout column>
		<v-flex>
			<job-progress></job-progress>
		</v-flex>

		<v-flex>
			<v-layout row wrap full-height>
				<v-flex order-sm2 order-md1 md3 xl5>
					<v-layout row wrap align-center>
						<v-flex xs12 sm6 md12>
							<job-control-panel></job-control-panel>
						</v-flex>
						<v-flex class="hidden-xs-only">
							<job-info-panel></job-info-panel>
						</v-flex>
					</v-layout>
				</v-flex>
				<v-flex order-sm1 order-md2 md9 xl7 d-flex>
					<v-layout column>
						<v-flex d-flex>
							<webcam-panel></webcam-panel>
						</v-flex>
						<v-flex shrink>
							<v-layout row wrap>
								<v-flex xs6 md12>
									<job-data-panel></job-data-panel>
								</v-flex>
								<v-flex xs6 md12>
									<job-estimations-panel></job-estimations-panel>
								</v-flex>
							</v-layout>
						</v-flex>
					</v-layout>
				</v-flex>
			</v-layout>
		</v-flex>
	</v-layout>
</template>
