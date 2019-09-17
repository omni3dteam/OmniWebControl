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
					<upload-btn :directory="directory" target="sys" color="primary" block></upload-btn>
					<upload-btn :directory="directory" target="macros" color="primary" block></upload-btn>
				</v-flex>
				
			</v-layout>
		</v-flex>
	</v-layout>
</template>
