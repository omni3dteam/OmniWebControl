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
            <v-icon class="mr-1">mdi-printer-3d-nozzle</v-icon> Printers
            <v-spacer></v-spacer>
            <v-btn color="success" @click="showNewPrinterDialog=true">Add new printer</v-btn>
        </v-card-title>
        <v-card-text>
            <table width="100%">
                <tr>
                    <th width="15%">Name</th>
                    <th width="15%">IP</th>
                    <th width="10%">Status</th>
                    <th width="30%">File</th>
                    <th width="15%">Progress</th>
                    <th width="15%">Est. time left</th>
                </tr>
                <tr>
                    <td colspan="6">
                        <v-divider></v-divider>
                    </td>
                </tr>
                <template v-for="(printer,key) in printers">
                    <tr :key="key">
                        <td>
                            <v-btn fab style="width:30px; height: 30px" color="error" @click="rmPrinter(printer)">
                                <v-icon small>delete</v-icon>
                            </v-btn>
                            <a :href="`http://${printer.ip}`" class="printerLink" target="_blank">
                                <strong>{{ printer.name }}</strong>
                            </a>
                        </td>
                        <td>
                            {{ printer.ip }}
                        </td>
                        <td>
                            <!-- {{ printer.status }} -->
                            <span class="status px-2" :class="statusClass(printer.status)">{{ statusText(printer.status) }}</span>
                        </td>
                        <td>
                            {{ printer.file }}
                        </td>
                        <td>
                            <!-- <template v-if="printer.isPrinting || printer.progress == 100"> -->
                            <v-progress-linear v-model="printer.progress" height="25" color="success">
                                <span class="d-flex justify-center align-center" style="font-weight: bold;">{{  $display(printer.progress, 1, '%') }}</span>
                            </v-progress-linear>
                            <!-- </template> -->
                        </td>
                        <td>
                            <template v-if="printer.isPrinting">
                                {{$displayTime(printer.timeLeft)}}
                            </template>
                        </td>
                    </tr>
                    <tr :key="`${key}-div`">
                        <td colspan="6">
                            <v-divider></v-divider>
                        </td>
                    </tr>
                </template>
            </table> 


        </v-card-text>
        <v-dialog v-model="showNewPrinterDialog" width="400px">
            <v-card>
                <v-card-title>
                    New printer
                    <v-spacer></v-spacer>
                    <v-btn fab small @click="showNewPrinterDialog=false">
                        <v-icon>cancel</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="newHost" label="hostname or IP"></v-text-field>
                    <v-text-field v-model="newName" label="name (optional)"></v-text-field>
                    <v-btn @click="addPrinter" color="success">Add new</v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
        <confirm-dialog 
            :shown.sync="showRmPrinterDialog" 
            question="Remove printer"
            :prompt="`Would you like to remove printer ${printerToRemove}`"
            @confirmed="confirmRmPrinter"
        />
    </v-card>
</template>

<script>
'use strict'

import { mapMutations, mapActions, mapState } from 'vuex'
import ConfirmDialog from '../dialogs/ConfirmDialog.vue'

export default {
  components: { ConfirmDialog },
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
                let _status = this.machineState(hostname)
                let _file = ""
                let _progress = 0
                let _timeLeft = 0
                let _isPrinting = false
                if (Object.keys(this.machines).includes(hostname)) {
                    const machine = this.machines[hostname]
                    _name = host.name || machine.model.network.name
                    _status = machine.model.state.status
                    _file = machine.model.job.file.fileName
                    _progress = this.jobProgress(machine.model)*100
                    _timeLeft = this.smartEstimate(machine.model)
                    _isPrinting = this.isPrinting(machine.model)
                }

                return {
                    'name': _name,
                    'ip': _ip,
                    'status': _status,
                    'file': _file,
                    'progress': _progress,
                    'timeLeft': _timeLeft,
                    'isPrinting': _isPrinting
                }

            })
        }
    },
    data() {
        return {
            showNewPrinterDialog: false,
            newHost: "",
            newName: "",
            showRmPrinterDialog: false,
            printerToRemove: undefined

        }
    },
    methods: {
        ...mapMutations('settings',['removePrinter','addOrEditPrinter']),
        ...mapActions(['connect']),
        rmPrinter(printer) {
            this.printerToRemove = printer.ip
            this.showRmPrinterDialog = true
            //this.removePrinter(printer.ip)
        },
        confirmRmPrinter() {
            
            if(this.printerToRemove) {
                console.log(this.printerToRemove)
                this.removePrinter(this.printerToRemove)
                this.prinerToRemove = undefined
            }   
        },
        cancelRmPrinter() {
            this.prinerToRemove = undefined
        },
        addPrinter() {
            this.showNewPrinterDialog = false
            const hostname = this.newHost
            const name = this.newName
            this.addOrEditPrinter({hostname, name})
            this.connect({ hostname })
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
        smartEstimate(state) {
            let progress = this.jobProgress(state)*100
            let timeLeft = 0

            if(progress>40 && progress<80){
                let weight = (progress-40)/60;
                let newTime = state.job.timesLeft.file * (weight) + Math.max(0, state.job.file.printTime - state.job.duration + state.job.warmUpDuration) * (1-weight);
                timeLeft = newTime ;}
            else if( progress <= 40){
                timeLeft = Math.max(0, state.job.file.printTime - state.job.duration + state.job.warmUpDuration);}
            else{
                timeLeft = state.job.timesLeft.file;}
                
            return timeLeft;
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
		statusClass(status) {
			switch (status) {
				case 'updating': return this.darkTheme ? 'blue darken-3' : 'blue lighten-3';
				case 'off': return this.darkTheme ? 'red darken-2 white--text' : 'red darken-1 white--text';
				case 'halted': return 'red white--text';
				case 'pausing': return this.darkTheme ? 'yellow darken-3' : 'orange accent-2';
				case 'paused': return this.darkTheme ? 'orange darken-2' : 'yellow lighten-1';
				case 'resuming': return this.darkTheme ? 'yellow darken-3' : 'orange accent-2';
				case 'processing': return 'green white--text';
				case 'simulating': return this.darkTheme ? 'light-blue darken-3' : 'light-blue accent-1';
				case 'busy': return this.darkTheme ? 'amber darken-2 white--text' : 'amber white--text';
				case 'changingTool': return this.darkTheme ? 'light-blue darken-2' : 'light-blue';
				case 'idle': return this.darkTheme ? 'light-blue darken-3' : 'light-blue accent-1';
                case 'connecting': return this.darkTheme ? 'light-blue darken-3' : 'light-blue accent-1';
				
			}
			return 'red white--text';
		}
    }
}
</script>
