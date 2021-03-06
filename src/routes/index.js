'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'

import Page404 from './Page404.vue'

import Control from './Control'
import Job from './Job'
import Files from './Files'
import Settings from './Settings'

Vue.use(VueRouter)

export const Routing = [
	/* Job
	{
		icon: 'print',
		caption: 'menu.job.caption',
		pages: [
			// Status
			{
				icon: 'info',
				caption: 'menu.job.status',
				path: '/',
				component: Job.Status,
				alias: '/Job/Status'
			},
			// Webcam
			{
				icon: 'photo_camera',
				caption: 'menu.job.webcam',
				path: '/Job/Webcam',
				component: Job.Webcam,
				condition: 'webcam',
				hidden: true
			}
			// Visualiser (coming soon)
			 {
				icon: 'theaters',
				caption: 'menu.job.visualiser',
				path: '/Job/Visualiser',
				component: Job.Visualiser
			} 
		]
	},*/
	
	// Control
	{
		icon: 'tune',
		caption: 'menu.control.caption',
		pages: [
			// Status
			{
				icon: 'info',
				caption: 'menu.job.status',
				path: '/',
				component: Job.Status,
				alias: '/Job/Status'
			},
			// Dashboard
			{
				icon: 'dashboard',
				caption: 'menu.control.dashboard',
				path: '/Dashboard',
				component: Control.Dashboard
			},
			// Events
			{
				icon: 'code',
				caption: 'menu.control.events',
				path: '/Events',
				component: Control.Events,
			},
			// Jobs
			{
				icon: 'play_arrow',
				caption: 'menu.files.jobs',
				path: '/Files/Jobs',
				component: Files.Jobs
			},
			// Console
			{
				icon: 'code',
				caption: 'menu.control.console',
				path: '/Console',
				component: Control.Console,
				hidden: true
			},
			// Height Map
			{
				icon: 'grid_on',
				caption: 'menu.control.heightmap',
				path: '/Heightmap',
				component: Control.Heightmap,
				hidden: true
			}
		]
	},
	// Settings
	{
		icon: 'build',
		caption: 'menu.settings.caption',
		pages: [
			// General
			{
				icon: 'settings',
				caption: 'menu.settings.general',
				path: '/Settings/General',
				component: Settings.General
			},
			// Machine
			{
				icon: 'settings_applications',
				caption: 'menu.settings.machine',
				path: '/Settings/Machine',
				component: Settings.Machine,
				hidden: true
			},
			// Macros
			{
				icon: 'polymer',
				caption: 'menu.files.macros',
				path: '/Files/Procedures',
				component: Files.Macros,
				hidden: true
			},
			// Filaments
			{
				icon: 'radio_button_checked',
				caption: 'menu.files.filaments',
				path: '/Files/Filaments',
				component: Files.Filaments,
				hidden: true
			},
			// Display
			{
				icon: 'format_list_numbered',
				caption: 'menu.files.display',
				path: '/Files/Display',
				component: Files.Display,
				condition: 'display'
			},
			// System
			{
				icon: 'settings',
				caption: 'menu.files.system',
				path: '/Files/System',
				component: Files.System,
				hidden: true
			}
		]
	}
]

export default new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		...Routing.map(category => category.pages).reduce((a, b) => a.concat(b)),
		{
			path: '*',
			component: Page404
		}
	]
})
