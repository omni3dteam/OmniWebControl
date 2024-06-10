<style scoped>

td {
    padding-left: 8px !important
}

th {
    padding-left: 8px !important;
    text-align: left !important
}

.progress {
    max-width: 300px !important;
}
</style>


<template>
    <v-card>
        <v-card-title>
            Queues
        </v-card-title>
        <v-card-text>
            <v-layout wrap>
                <v-flex xs12 v-for="(printer,key) in printers" :key="key" class="mb-2">
                    <v-divider></v-divider>
                    <v-layout>
                        <v-flex xs12 sm6 md4 lg3 class="mt-2">
                            <strong>{{ printer.name }} ({{ printer.ip }})</strong>
                            <br>
                            {{ statusText(printer.status)+(printer.isPrinting ? `: ${printerfile}` : "") }}
                        </v-flex>
                        <v-flex class="hidden-xs-only" >
                            <v-progress-linear v-if="printer.isPrinting" v-model="printer.progress" height="25" class="progress" color="success">
                                <span class="d-flex justify-center align-center" style="font-weight: bold;">{{  $display(printer.progress, 1, '%') }}</span>
                            </v-progress-linear>
                        </v-flex>
                        <!-- <v-spacer></v-spacer> -->
                        <v-flex shrink>
                            <v-btn v-if="printer.queueActive" @click="cmd(printer,'STOP')" color="warning">
                                <v-icon class="mr-1">stop</v-icon>
                                Stop
                            </v-btn>
                            <v-btn v-else @click="cmd(printer,'START')" color="success">
                                <v-icon class="mr-1">play_arrow</v-icon>
                                Start
                            </v-btn>                            
                        </v-flex>
                    </v-layout>
                    <v-progress-linear v-if="printer.isPrinting" v-model="printer.progress" height="25" class="hidden-sm-and-up" color="success">
                        <span class="d-flex justify-center align-center" style="font-weight: bold;">{{  $display(printer.progress, 1, '%') }}</span>
                    </v-progress-linear>

                    <table>
                        <tr v-for="(job,key) in printer.queue" :key="key">
                            <td>
                                {{ job.file }}
                            </td>
                        </tr>
                        <tr v-if="!printer.queue || printer.queue.length == 0">
                            <td>
                                <i>No jobs scheduled</i>
                            </td>
                        </tr>
                    </table>
                    

                </v-flex>
            </v-layout>
            <v-text-field label="code" v-model="code"></v-text-field>
            <v-btn @click="execCode">exec</v-btn>
            {{ printq }}


        </v-card-text>
        
    </v-card>
</template>

<script>
'use strict'

import { mapActions, mapState } from 'vuex'

export default {
    computed: {
        ...mapState('backend/model',['printq']),
        ...mapState({
            machines: state => state.machines,
            connectionStates: state => state.connectionStates,
            hosts: state => state.settings.hosts,
            darkTheme: state => state.settings.darkTheme
        }),
        keys() { return Object.keys(this.machines)},
        printers() {

            return this.hosts
            .map(host => {
                let hostname = host.hostname
                let _name = host.name || "untitled"
                let _ip = hostname
                let _status = this.machineState(hostname)
                let _file = ""
                let _progress = 0
                // let _timeLeft = 0
                let _isPrinting = false
                let _queueActive = false
                let _queue = []
                if (Object.keys(this.machines).includes(hostname)) {
                    const machine = this.machines[hostname]
                    _name = host.name || machine.model.network.name
                    _status = machine.model.state.status
                    _file = machine.model.job.file.fileName
                    _progress = this.jobProgress(machine.model)*100
                    // _timeLeft = this.smartEstimate(machine.model)
                    _isPrinting = this.isPrinting(machine.model)
                }

                const queueIndex = this.printq.findIndex(printer => printer.hostname === hostname )
                if (queueIndex >= 0 ) {
                    _queueActive = this.printq[queueIndex].queue_active
                    _queue = this.printq[queueIndex].queue
                }

                return {
                    'name': _name,
                    'ip': _ip,
                    'queueActive': _queueActive,
                    'status': _status,
                    'file': _file,
                    'progress': _progress,
                    // 'timeLeft': _timeLeft,
                    'isPrinting': _isPrinting,
                    'queue': _queue

                }

            })
        }
    },
    data() {
        return {
            code: "",
        }
    },
    methods: {
        ...mapActions('backend',['sendCode']),
        execCode() { this.sendCode(this.code) },
        cmd(printer,cmd) {
            this.sendCode(`${printer.ip};${cmd}`)
        },
        machineState(hostname) {
            if (Object.keys(this.connectionStates).includes(hostname)) {
                return this.connectionStates[hostname]
            }
            return 'disconnected'
        },
        isPrinting(state) {
            return ['pausing', 'paused', 'resuming', 'processing', 'simulating'].includes(state.state.status)
        },
        fractionPrinted: state => (state.job.filePosition && state.job.file.size) ? state.job.filePosition / state.job.file.size : 0,
        jobProgress(state) {
            if (this.isPrinting(state)) {
                if (state.state.status !== 'simulating' && state.job.file.filament.length && state.job.extrudedRaw.length) {
                    return Math.min(1, state.job.extrudedRaw.reduce((a, b) => a + b) / state.job.file.filament.reduce((a, b) => a + b));
                }
                return this.fractionPrinted(state);
            }
            return state.job.lastFileName ? 1 : 0;
        },
        statusType(status) {
			if (!status) {
				return 'unknown';
			}
			if (status === 'processing') {
				return 'printing';
			}
			return status;
		},
		statusText(status) {
			return this.$t(`generic.status.${this.statusType(status)}`);
		},
    }
}
</script>
