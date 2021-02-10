'use strict'

const boardDefinitions = {
    duetwifi: {
        firmwareFileRegEx: /(Duet2CombinedFirmware|Omni3DRRFirmware)(.*)\.bin/i,
        firmwareFile: 'Duet2CombinedFirmware.bin',
        motorWarningCurrent: 2000,
        motorLimitCurrent: 2400,
        seriesResistor: 4700,
        microstepping: true,
        microsteppingInterpolation: false,
        maxDrives: 10,
        maxHeaters: 8,
        maxThermistors: 8,
        maxRtdBoards: 8,
        maxFans: 3,
        hasDisplay: false,
        hasEthernet: false,
        hasWiFi: true,
        hasPowerFailureDetection: true,
        hasMotorLoadDetection: true
    },
    duetethernet: {
        firmwareFileRegEx: /(Duet2CombinedFirmware|Omni3DRRFirmware)(.*)\.bin/i,
        firmwareFile: 'Duet2CombinedFirmware.bin',
        motorWarningCurrent: 2000,
        motorLimitCurrent: 2400,
        seriesResistor: 4700,
        microstepping: true,
        microsteppingInterpolation: false,
        maxDrives: 10,
        maxHeaters: 8,
        maxThermistors: 8,
        maxRtdBoards: 8,
        maxFans: 3,
        hasDisplay: false,
        hasEthernet: true,
        hasWiFi: false,
        hasPowerFailureDetection: true,
        hasMotorLoadDetection: true
    },
    duetmaestro: {
        firmwareFileRegEx: /DuetMaestroFirmware(.*)\.bin/i,
        firmwareFile: 'DuetMaestroFirmware.bin',
        motorWarningCurrent: 1200,
        motorLimitCurrent: 1600,
        seriesResistor: 2200,
        microstepping: true,
        microsteppingInterpolation: true,
        maxDrives: 7,
        maxHeaters: 3,
        maxThermistors: 4,
        maxRtdBoards: 4,
        maxFans: 3,
        hasDisplay: true,
        hasEthernet: true,
        hasWiFi: false,
        hasPowerFailureDetection: true,
        hasMotorLoadDetection: true
    }
}

export const defaultBoardName = 'duetwifi'
export const defaultBoard = boardDefinitions[defaultBoardName]

export function getBoardDefinition(boardType) {
    for (let board in boardDefinitions) {
        if (boardType.startsWith(board)) {
            return boardDefinitions[board];
        }
    }

    console.warn(`Unsupported board ${boardType}, assuming Duet WiFi`);
    return boardDefinitions[defaultBoardName];
}