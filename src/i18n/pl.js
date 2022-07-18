export default {
	language: 'Polish',
	'$vuetify': {
		dataIterator: {
			rowsPerPageText: 'Wartości na stronę:',
			rowsPerPageAll: 'Wszystkie',
			pageText: '{0}-{1} z {2}',
			noResultsText: 'No matching records found',
			nextPage: 'Następna strona',
			prevPage: 'Poprzednia strona'
		},
		dataTable: {
			rowsPerPageText: 'Rows per page:'
		},
		noDataText: 'Brak danych'
	},
	button: {
		add: {
			caption: 'Dodaj'
		},
		connect: {
			connect: 'Połącz',
			connecting: 'Łączenie...',
			disconnect: 'Rozłącz',
			disconnecting: 'Rozłączanie...'
		},
		emergencyStop: {
			caption: 'Zatrzymanie Awaryjne',
			title: 'Wymuś natychmiastowe uruchomienie ponowne (M112+M999)'
		},
		home: {
			captionAll: 'Bazuj XYZ',
			titleAll: 'Bazuj wszystkie osie (G28)',
			captionXY: 'Bazuj XY',
			titleXY: 'Bazuj XY ',
			caption: 'Bazuj {0}',
			title: 'Bazuj oś {0} (G28 {0})'
		},
		newDirectory: {
			caption: 'Nowy folder'
		},
		newFilament: {
			caption: 'Nowy filament'
		},
		newFile: {
			caption: 'Nowy plik'
		},
		refresh: {
			caption: 'Odśwież'
		},
		upload: {
			gcodes: {
				caption: 'Wgraj Plik G-Code',
				title: 'Wgraj plik/i G-Code'
			},
			start: {
				caption: 'Wgraj i /uruchom',
				title: 'Wgraj i uruchom plik/i G-Code'
			},
			macros: {
				caption: 'Wgraj pliki procedur',
				title: 'Wgraj plik/i procedur'
			},
			filaments: {
				caption: 'Wgraj konfirugrację filamentu',
				title: 'Wgraj plik/i konfiguracji filamentu'
			},
			display: {
				caption: 'Aktualizuj wyświetlacz',
				title: 'Aktualizuj oprogramowanie wyświetlacza'
			},
			sys: {
				caption: 'Aktualizuj Oprogramowanie',
				title: 'Wgraj plik/i systemowe'
			},
			www: {
				caption: 'Upload Web Files',
				title: 'Upload one or more web files (drag&drop is supported as well)'
			},
			update: {
				caption: 'Upload Update',
				title: 'Upload an update package (drag&drop is supported as well)'
			}
		},
		download: {
			log: {
				caption: 'Pobierz Pliki Logów',
				title: 'Pobierz spakowany plik zip z logami i ustawieniami konfiguracyjnymi'
			}
		}
	},
	chart: {
		layer: {
			caption: 'Layer Chart',
			layerTime: 'Layer Time',

			showLastLayers: 'Show Last {0} Layers',
			showAllLayers: 'Show All Layers',

			layer: 'Layer {0}',
			layerDuration: 'Duration: {0}',
			layerHeight: 'Layer Height: {0}',
			filamentUsage: 'Filament Usage: {0}',
			fractionPrinted: 'File Progress: {0}'
		},
		temperature: {
			caption: 'Wykres temperatur',
			heater: 'Grzałka {0}'
		}
	},
	dialog: {
		changeMoveStep: {
			title: 'Change move step',
			prompt: 'Please enter a new value for the clicked move button:'
		},
		configUpdated: {
			title: 'Wymagany restart',
			prompt: 'Czy chcesz zrestartować elektronikę w celu wczytania nowych ustawień?'
		},
		connect: {
			title: 'Łączenie z maszyną',
			prompt: 'Proszę podać nazwę oraz hasło:',
			hostPlaceholder: 'Nazwa',
			hostRequired: 'Nazwa jest wymagana',
			passwordPlaceholderOptional: 'Hasło (opcjonalne)',
			passwordPlaceholder: 'Hasło',
			passwordRequired: 'Hasło jest wymagane',
			connect: 'Połącz'
		},
		connection: {
			connecting: 'Łączenie...',
			disconnecting: 'Rozłączanie...',
			reconnecting: 'Utracono połączenie, łączenie...',
			standBy: 'Proszę czekać...'
		},
		editExtrusionAmount: {
			title: 'Edytuj wartość ekstruzji',
			prompt: 'Please enter a new amount for the clicked button:'
		},
		editExtrusionFeedrate: {
			title: 'Edytuj prędkość ekstruzji',
			prompt: 'Please enter a new feedrate for the clicked button:'
		},
		factoryReset: {
			title: 'Wykonać reset fabryczny?',
			prompt: 'Czy wykonać reset fabryczny? Uwaga, wszystkie dotychczasowe ustawienia zostaną utracone!'
		},
		filament: {
			titleChange: 'Change Filament',
			titleLoad: 'Load Filament',
			prompt: 'Please choose a filament:'
		},
		fileEdit: {
			gcodeReference: 'G-Code - Informacje',
			menuReference: 'Menu Reference',
			save: 'Zapisz'
		},
		meshEdit: {
			title: 'Set Mesh Parameters',
			radius: 'Probe Radius',
			spacing: 'Spacing',
			startCoordinate: 'Start coordinate in {0} direction',
			endCoordinate: 'End coordinate in {0} direction',
			spacingDirection: 'Spacing in {0} direction'
		},
		newDirectory: {
			title: 'Nowy folder',
			prompt: 'Proszę wprowadzić nazwę folderu:'
		},
		newFilament: {
			title: 'New Filament',
			prompt: 'Please enter a name for the new filament:'
		},
		newFile: {
			title: 'Nowy plik',
			prompt: 'Proszę wprowadzić nazwę pliku:'
		},
		renameFile: {
			title: 'Zmiana nazwy',
			prompt: 'Proszę wprowadzić nową nazwę:'
		},
		resetHeaterFault: {
			title: 'Zresetuj błąd grzałki',
			prompt: 'Wystąpił błąd grzałki {0}. Zaleca się ponowne uruchomienie maszyny.',
			resetFault: 'Wystąpił błąd podczas resetowania'
		},
		runMacro: {
			title: 'Uruchom {0}',
			prompt: 'Czy chcesz uruchomić {0}?'
		},
		startJob: {
			title: 'Drukuj {0}',
			prompt: 'Czy chcesz rozpocząć drukowanie {0}?'
		},
		update: {
			title: 'Install updates?',
			prompt: 'You have uploaded at least one firmware update. Would you like to install them now?'
		},
		downloadLog: {
			title: 'Pobierz Pliki Logów',
			prompt: 'Przygotowywanie danych...'
		},
		inputRequired: 'Proszę podać wartość',
		numberRequired: 'Liczba nieprawidłowa'
	},
	directory: {
		display: 'Menu',
		filaments: 'Filamenty',
		gcodes: 'Pliki G-Code',
		macros: 'Procedury',
		sys: 'System',
		www: 'WWW'
	},
	error: {
		notImplemented: '{0} nie jest zaimplementowana',
		invalidPassword: 'Hasło nieprawidłowe!',
		noFreeSession: 'Brak wolnych sesji!',
		connect: 'Nie udało się połączyć z {0}',
		disconnect: 'Nie udało się prawdiłowo rozłączyć {0}',
		disconnected: 'Nie można ukończyć akcji, ponieważ połączenie zostało zakończone',
		cancelled: 'Operacja anulowana',
		network: 'Błąd połączenia',
		timeout: 'Przekroczono limit czasu żądania HTTP',
		driveUnmounted: 'Dysk docelowy nie jest zamontowany',
		directoryNotFound: 'Folder {0} nie został znaleziony',
		fileNotFound: 'Plik {0} nie został znaleziony',
		invalidHeightmap: 'Nieprawidłowa mapa platformy',
		operationFailed: 'Operacja się nie powiodła (Pzzyczyna: {0})',
		uploadStartWrongFileCount: 'Można załadować i uruchomić tylko jeden plik na raz',
		uploadNoSingleZIP: 'Można załadować tylko jeden plik ZIP na raz',
		uploadNoFiles: 'Plik ZIP nie zawiera żadnych użytecznych plików',
		uploadDecompressionFailed: 'Nie udało się rozpakować pliku ZIP',
		codeResponse: 'Nie udało się uruchomić kodu, ponieważ odebrano złą odpowiedź',
		codeBuffer: 'Nie udało się uruchomić kodu, ponieważ przestrzeń bufora została wyczerpana',
		enterValidNumber: 'Podaj poprawny numer',
		turnOffEverythingFailed: 'Nie udało się wszystkiego wyłączyć',
		filelistRequestFailed: 'Nie udało się pobrać listy plików',
		fileinfoRequestFailed: 'Nie udało się uzyskać informacji o pliku dla {0}',
		filamentsLoadFailed: 'Nie udało się załadować filamentów',
		move: 'Nie udało się przenieść {0} do {1}'
	},
	events: {
		connected: 'Połączono z {0}',
		connectionLost: 'Nie udało się utrzymać połączenia z {0}',
		emergencyStop: 'Zatrzymanie awaryjne, próba ponownego połączenia...',
		reconnecting: 'Połączenie przerwane, próba ponownego połączenia...',
		reconnected: 'Nawiązano połączenie',
		disconnected: 'Rozłączono z {0}'
	},
	generic: {
		ok: 'OK',
		cancel: 'Anuluj',
		yes: 'Tak',
		no: 'Nie',
		close: 'Anuluj',
		reset: 'Resetuj',
		noValue: 'n/a',
		loading: 'ładuje',
		error: 'Błąd',
		info: 'Informacje',
		warning: 'Ostrzeżenie',
		success: 'Powodzenie',
		heaterStates: [
			'wyłączona',
			'oczekuje',
			'aktywna',
			'błąd',
			'kalibruje'
		],
		status: {
			updating: 'Aktualizuje',
			off: 'Wyłączony',
			halted: 'Zatrzymany',
			pausing: 'Pauzowanie',
			paused: 'Pauza',
			resuming: 'Wznawianie',
			printing: 'Drukowanie',
			processing: 'Przetwarzanie',
			simulating: 'Symulowanie',
			busy: 'Zajęty',
			changingTool: 'Zmiana narzędzia',
			idle: 'Gotowy do pracy',
			unknown: 'Nieznany'
		},
		rpm: 'Obroty',
		sdCard: 'Karta SD {0}',
		mounted: 'wykryto kartę',
		notMounted: 'brak karty',
		extracting: 'Wczytywanie',
		uploading: 'Wgrywanie',
		active: 'Aktywna',
		standby: 'Oczekująca'
	},
	input: {
		code: {
			send: 'Wyślij',
			placeholder: 'Wyślij kod...'
		},
		addTemperature: 'Nowa wartość temperatury',
		addRPM: 'Nowa wartość obrotów'
	},
	jobProgress: {
		simulating: 'Symulowanie {0}, {1}',
		simulated: 'Pzeprowadzono symulację {0}, 100 %',
		processing: 'Przetwarzanie {0}, {1}',
		processed: 'Przetworzono {0}, 100 %',
		printing: 'Drukowanie {0}, {1}',
		printed: 'Wydrukowano {0}, 100 %',
		noJob: 'Maszyna gotowa do pracy.',
		layer: 'Warstwa {0} z {1}',
		filament: 'Zużycie filamentu: {0}',
		filamentRemaining: '{0} pozostało'
	},
	list: {
		baseFileList: {
			fileName: 'Nazwa pliku',
			size: 'Rozmiar',
			lastModified: 'Ostatnio modyfikowany',
			download: 'Pobierz',
			edit: 'Edytuj',
			rename: 'Zmień nazwę',
			delete: 'Usuń',
			downloadZIP: 'Pobierz jako ZIP',
			noFiles: 'Brak plików lub folderów',
			goUp: 'Do góry'
		},
		display: {
			noFiles: 'No Display Files'
		},
		eventLog: {
			date: 'Date',
			type: 'Type',
			message: 'Event',
			noEvents: 'No Events',
			clear: 'Wyczyść',
			downloadText: 'Pobierz jako tekst',
			downloadCSV: 'Pobierz jako CSV'
		},
		filament: {
			noFilaments: 'Brak Filamentów'
		},
		macro: {
			caption: 'Procedury',
			noMacros: 'Brak Procedur',
			run: 'Uruchom Procedurę',
			root: 'Root'
		},
		jobs: {
			height: 'Wysokość modelu',
			layerHeight: 'Wysokość warstwy',
			filament: 'Zużycie filamentu',
			printTime: 'Czas druku',
			simulatedTime: 'Czas z symulacji',
			generatedBy: 'Wygenerowany przez',

			noJobs: 'Brak',
			start: 'Rozpocznij wydruk',
			simulate: 'Rozpocznij symulację'
		},
		sys: {
			noFiles: 'Brak plików systemowych'
		}
	},
	menu: {
		control: {
			caption: 'Maszyna',
			dashboard: 'Obsługa',
			events: 'Zdarzenia',
			console: 'Konsola',
			heightmap: 'Mapa platformy'
		},
		job: {
			caption: 'Aktualne',
			status: 'Status',
			webcam: 'Kamera',
			visualiser: 'Wizualizator'
		},
		files: {
			caption: 'Pliki',
			jobs: 'Pliki',
			filaments: 'Filamenty',
			macros: 'Procedury',
			display: 'Ekran',
			system: 'System',
			web: 'Web'
		},
		settings: {
			caption: 'Ustawienia',
			general: 'Główne',
			machine: 'Maszyna',
			update: 'Aktualizacja'
		}
	},
	notification: {
		compress: {
			title: 'Kompresuje pliki...',
			message: 'Proszę czekać, kompresowanie plików w trakcie...',
			errorTitle: 'Nie udało się skompresować plików'
		},
		delete: {
			errorTitle: 'Wystąpił błąd podczas usuwania {0}',
			errorMessageDirectory: 'Folder nie jest pusty',
			success: 'Pomyślnie usunięto {0}',
			successMultiple: 'Pomyślnie usunięto {0} plików'
		},
		deleteFilament: {
			errorTitle: 'Failed to delete filament(s)',
			errorStillLoaded: 'At least one of the selected filaments is still loaded. Please unload them before you proceed',
			errorSubDirectories: 'The filament {0} contains sub-directories. Please delete them manually and try again.'
		},
		download: {
			title: 'Pobieranie {0} @ {1}, {2}%',
			message: 'Proszę czekać, pobieranie w trakcie...',
			success: 'Pobieranie {0} ukończono pomyślnie po {1}',
			successMulti: 'Pomyślnie pobrano {0} plików',
			error: 'Nie udało się pobrać {0}'
		},
		loadingFile: {
			title: 'Ładuje plik...',
			message: 'Proszę czekać.'
		},
		message: 'Informacja',
		mount: {
			successTitle: 'Wykryto kartę SD',
			errorTitle: 'Nie udało się wykryć karty SD'
		},
		newDirectory: {
			errorTitle: 'Nie udało się utworzyć folderu',
			successTitle: 'Folder utworzony',
			successMessage: 'Pomyślnie utworzono folder {0}'
		},
		newFilament: {
			errorTitle: 'Failed to create filament',
			errorTitleMacros: 'Failed to create filament procedures',
			successTitle: 'Filament created',
			successMessage: 'Successfully created filament {0}'
		},
		rename: {
			success: 'Nazwa zmieniona pomyślnie z {0} na {1}',
			error: 'Nie udało się zmienić nazwy {0} na {1}',
		},
		renameFilament: {
			errorTitle: 'Failed to rename filament',
			errorStillLoaded: 'This filament is still loaded. Please unload it before you proceed'
		},
		responseTooLong: 'Przekroczony limit oczekiwania na odpowiedź',
		upload: {
			title: 'Wgrywanie {0}, {2}%',
			message: 'Proszę czekać, wgrywanie pliku w trakcie...',
			success: 'Wgrano {0} po {1}',
			successMulti: 'Poprawnie wgrano {0} plików',
			error: 'Wystąpił błąd podczas wgrywania {0}'
		}
	},
	panel: {
		atx: {
			caption: 'ATX Power',
			on: 'On',
			off: 'Off'
		},
		babystepping: {
			caption: 'Z Babystepping',
			current: 'Current Offset: {0}'
		},
		extrude: {
			caption: 'Ekstruzja',
			mix: 'Mix',
			mixRatio: 'Mix Ratio:',
			amount: 'Ilość w {0}:',
			feedrate: 'Prędkość {0}:',
			retract: 'Wycofaj',
			extrude: 'Ekstruduj'
		},
		extrusionFactors: {
			caption: 'Extrusion Factors',
			changeVisibility: 'Change Visibility',
			extruder: 'Extruder {0}',
			noExtruders: 'No Extruders'
		},
		fan: {
			caption: 'Wentylatory',
			selection: 'Wybrany wentylator:',
			toolFan: 'Wentylator głowicy',
			fan: 'Wentylator {0}'
		},
		fans: {
			caption: 'Wentylatory',
			changeVisibility: 'Zmień widoczność',
			toolFan: 'Wentylator głowicy',
			fan: 'Wentylator {0}',
			noFans: 'Brak wentylatorów'
		},
		filamentSensors:
		{
			caption: 'Czujniki filamentu',
			nameLeft: 'Czujnik lewego ekstrudera',
			nameRight: 'Czujnik prawego ekstrudera'
		},
		heightmap: {
			scale: 'Scale:',
			orMore: 'or more',
			orLess: 'or less',
			axes: 'Axes:',
			numPoints: 'Number of points: {0}',
			radius: 'Probing radius: {0}',
			area: 'Probe area: {0}',
			maxDeviations: 'Maximum deviations: {0} / {1}',
			meanError: 'Mean error: {0}',
			rmsError: 'RMS error: {0}',
			topView: 'Top view',
			colorScheme: 'Color scheme:',
			terrain: 'Terrain',
			heat: 'Heat',
			reload: 'Reload Height Map'
		},
		jobControl: {
			caption: 'Kontrola wydruku',
			cancelJob: 'Anuluj',
			cancelPrint: 'Anuluj Wydruk',
			cancelSimulation: 'Anuluj Symulację',
			pauseJob: 'Pauza',
			pausePrint: 'Pauza',
			pauseSimulation: 'Pauza',
			resumeJob: 'Wznów',
			resumePrint: 'Wznów Drukowanie',
			resumeSimulation: 'Wznów Symulację',
			repeatJob: 'Rozpocznij Ponownie',
			repeatPrint: 'Drukuj Ponownie',
			repeatSimulation: 'Symuluj Ponownie',
			autoSleep: 'Aktywuj Auto-Usypianie'
		},
		jobData: {
			caption: 'Dane wydruku',
			warmUpDuration: 'Czas Rogrzewania',
			currentLayerTime: 'Czas Obecnej Warstwy',
			lastLayerTime: 'Czas Poprzedniej Warstwy',
			jobDuration: 'Czas Druku'
		},
		jobEstimations: {
			caption: 'Szacowanie',
			filament: 'Zużycia filamentu',
			file: 'Zaawansowania pliku',
			layer: 'Czasu druku warstw',
			slicer: 'Szacunków slicera',
			simulation: 'Na Podstawie Symulacji',
			smart: 'Pozostały Czas'
		},
		jobInfo: {
			caption: 'Dane pliku',
			height: 'Wysokość:',
			layerHeight: 'Wysokość Warswy:',
			filament: 'Zużycie Materiału:',
			generatedBy: 'Wygenerowany przez:'
		},
		mesh: {
			caption: 'Mesh przed wydrukiem',
			label: 'Pomiary siatki Mesh przed wydrukiem'
		},
		movement: {
			caption: 'Kontrola położenia',
			compensation: 'Kompensacja i Kalibracja',
			runBed: 'True Bed Levelling (G32)',
			runDelta: 'Delta Calibration (G32)',
			compensationInUse: 'Compensation in use: {0}',
			disableBedCompensation: 'Disable Bed Compensation (M561)',
			disableMeshCompensation: 'Disable Mesh Compensation (G29 S2)',
			editMesh: 'Define Area for Mesh Compensation (M557)',
			runMesh: 'Tworzę mapę platformy',
			loadMesh: 'Wczytano mapę platformy',
			axesNotHomed: 'Następująca oś jest niezbazowana:|Następujące osie są niezbazowane:'
		},
		settingsAbout: {
			caption: 'About',
			developedBy: 'Web Interface developed by',
			for: 'and ',
			licensedUnder: 'Licensed under the terms of the'
		},
		settingsAppearance: {
			caption: 'Wygląd',
			darkTheme: 'Tryb ciemny',
			language: 'Język',
			binaryFileSizes: 'Używaj binarnych rozmiarów plików',
			binaryFileSizesTitle: 'Wyświetla rozmiar w oparciu o 1024 (IEC) zamiast 1000 (SI)'
		},
		settingsCommunication: {
			caption: 'Communication',
			ajaxRetries: 'Number of maximum AJAX retries',
			updateInterval: 'Update interval ({0})',
			extendedUpdateEvery: 'Extended status update interval',
			fileTransferRetryThreshold: 'Retry threshold for file transfers ({0})'
		},
		settingsElectronics: {
			caption: 'Electronics',
			diagnostics: 'Diagnostics',
			firmware: 'Firmware: {0} {1}',
			dwsFirmware: 'Duet WiFi Server Version: {0}',
			serialNumber: 'Serial number: {0}'
		},
		settingsGeneral: {
			caption: 'General',
			factoryReset: 'Revert to factory defaults',
			settingsStorageLocal: 'Save settings in local storage',
			settingsSaveDelay: 'Update delay for settings changes ({0})',
			cacheStorageLocal: 'Save cache in local storage',
			cacheSaveDelay: 'Update delay for cache changes ({0})'
		},
		settingsListItems: {
			caption: 'List Items',
			toolTemperatures: 'Tool Temperatures',
			bedTemperatures: 'Bed Temperatures',
			chamberTemperatures: 'Chamber Temperatures',
			spindleRPM: 'Spindle RPM'
		},
		settingsMachine: {
			caption: 'Machine-Specific',
			revertDWC: 'Revert to DWC1',
			babystepAmount: 'Babystep amount ({0})',
			moveFeedrate: 'Feedrate for move buttons ({0})'
		},
		settingsNotifications: {
			caption: 'Powiadomienia',
			notificationErrorsPersistent: 'Nie zamykaj ostrzeżen automatycznie',
			notificationTimeout: 'Domyślny czas wygasania powiadomień ({0})'
		},
		settingsWebcam: {
			caption: 'Webcam',
			webcamURL: 'Webcam URL (optional)',
			webcamUpdateInterval: 'Webcam update interval ({0})',
			webcamFix: 'Do not append extra HTTP qualifier when reloading images',
			webcamEmbedded: 'Embed webcam image in an iframe',
			webcamRotation: 'Rotate webcam image',
			webcamFlip: 'Flip webcam image',
			flipNone: 'None',
			flipX: 'Flip X',
			flipY: 'Flip Y',
			flipBoth: 'Flip both'
		},
		speedFactor: {
			caption: 'Szybkość druku'
		},
		status: {
			caption: 'Status',
			mode: 'Tryb: {0}',
			toolPosition: 'Położenie głowicy',
			machinePosition: 'Położenie',
			extruders: 'Ekstrudery',
			extruderDrive: 'Ekstruder {0}',
			speeds: 'Prędkości',
			requestedSpeed: 'Prędkość zadana',
			topSpeed: 'Maksymalna prędkość',
			sensors: 'Czujniki',
			mcuTemp: 'Temperatura MCU',
			mcuTempTitle: 'Minimum: {0}, Maksimum: {1}',
			vIn: 'Napięcie',
			vInTitle: 'Minimum: {0}, Maksimum {1}',
			probe: 'Czujnik Z|Czujniki Z'
		},
		tools: {
			caption: 'Głowice',
			controlAll: 'Zmień wszystkie',
			turnEverythingOff: 'Wyłącz wszystkie grzałki',
			allActiveTemperatures: 'Ustaw wszystkie temperatury aktywne',
			allStandbyTemperatures: 'Ustaw wszystkie temperatury oczekujące',
			tool: 'Głowica {0}',
			loadFilament: 'Load Filament',
			changeFilament: 'Change Filament',
			unloadFilament: 'Unload Filament',
			heater: 'Grzałka {0}',
			current: 'Aktualna',
			active: 'Aktywna',
			standby: 'Oczekuje',
			bed: 'Platforma {0}',
			chamber: 'Komora {0}',
			extra: {
				caption: 'Dodatkowe',
				sensor: 'Czujnik',
				value: 'Wartość',
				showInChart: 'Pokazuj na wykresie'
			}
		},
		webcam: {
			caption: 'Kamera',
			alt: ''
		}
	}
}
