<style scoped>

td {
    padding-left: 8px !important
}

th {
    padding-left: 8px !important;
    text-align: left !important
}

.printerLink:not(:hover) {
	color: inherit;
}

.status {
	border-radius: 5px;
}
</style>


<template>
    <v-card>
        <v-card-title>
            <v-icon small class="mr-1">videocam</v-icon> {{ $t('panel.webcam.caption') }}
        </v-card-title>
        <v-card-text>
            <v-layout row wrap>
                <v-flex xs12 sm6 md4 lg3 v-for="(p,k) in printers" :key="k" class="pa-1">
                    {{ p.name }} ({{ p.ip }})
                    <img :src="p.webcamIp" width="100%" />
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
'use strict'

import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState({
            machines: state => state.machines,
            connectionStates: state => state.connectionStates,
            hosts: state => state.settings.hosts,
            darkTheme: state => state.settings.darkTheme
        }),
        // ...mapState('settings', ['darkTheme']),
        keys() { return Object.keys(this.machines)},
        printers() {

            return this.hosts
            .map(host => {
                let hostname = host.hostname
                let _name = host.name || "untitled"
                let _ip = hostname
                if (Object.keys(this.machines).includes(hostname)) {
                    const machine = this.machines[hostname]
                    _name = host.name || machine.model.network.name
                    // _status = machine.model.state.status
                    // _file = machine.model.job.file.fileName
                    // _progress = this.jobProgress(machine.model)*100
                    // _timeLeft = this.smartEstimate(machine.model)
                    // _isPrinting = this.isPrinting(machine.model)
                }

                return {
                    'name': _name,
                    'ip': _ip,
                    'webcamIp': `http://${_ip}:8081`
                }

            })
        }
    },
}
</script>
