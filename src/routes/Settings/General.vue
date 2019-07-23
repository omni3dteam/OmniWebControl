<template>
	<v-layout row wrap>
		<v-flex md12 lg12>
			<v-layout row wrap>
				
				<v-flex sm6 md12>
					<settings-apperance-panel></settings-apperance-panel>
				</v-flex>
				<v-flex sm6 md12>
					<settings-notifications-panel></settings-notifications-panel>
				</v-flex>
				<v-flex xs12>
					<settings-about-panel></settings-about-panel>
				</v-flex>
				<v-flex>
					<upload-btn class="hidden-sm-and-down" :directory="directory" target="sys" color="primary"></upload-btn>
				</v-flex>
			</v-layout>
		</v-flex>
	</v-layout>
</template>
