#!/usr/bin/env node

import getStore from './utils/get-store.js'
import getAdminPage from './utils/get-admin-page.js'
import processStoreName from './utils/process-store-name.js'
import chalk from 'chalk'
import { exec } from 'child_process'

let dev = process.env.NODE_ENV === 'development'

let { store } = await getStore()
let { page } = await getAdminPage()

let url = `https://${ processStoreName(store) }/admin/${ page }`

console.log(`\nOpening ${ chalk.green(url) }`)

!dev && exec(`open ${ url }`)
