#!/usr/bin/env node

import yargs from 'yargs'
import fs from 'fs'
import chalk from 'chalk'
import inquirer from 'inquirer'
import autocomplete from 'inquirer-autocomplete-prompt'
import fuzzy from 'fuzzy'
import { exec } from 'child_process'

let { argv } = yargs(process.argv)

const processStoreName = store => !store?.includes('.')
  ? `${store}.myshopify.com`
  : store

function processArgs() {
  let store_arg = argv.s || argv.store
  let store =
    typeof store_arg === 'object' ? store_arg.map(processStoreName) :
    typeof store_arg === 'string' ? processStoreName(store_arg) :
    null

  return ({ store })
}

inquirer.registerPrompt('autocomplete', autocomplete)

async function getConfig() {
  const config = fs.existsSync('.shopifystores') && fs.readFileSync('.shopifystores', 'utf8').split(/\n/).filter(Boolean)
  const pkg = fs.existsSync('package.json') && JSON.parse(fs.readFileSync('package.json'))

  let stores = config || pkg.shopify?.store

  if (!!stores?.length) {
    return stores.map(processStoreName)
  }

  return stores
}

async function getStore() {
  let store = processArgs().store || await getConfig()

  if (typeof store === 'object' && !!store.length && store.every(s => s !== '')) {
    return await inquirer.prompt({
      name: 'store',
      type: 'autocomplete',
      message: 'Select a store',
      source: async (answers, input = '') => fuzzy
        .filter(input, store)
        .map(el => el.original),
    })
  } else if (typeof store === 'string' && store !== '') {
    return { store }
  } else {
    return await inquirer.prompt({
      name: 'store',
      type: 'input',
      message: 'Enter your store name',
      validate: input => !!input || 'Please enter a store name',
      transformer: input => {
        if (input.includes('.')) {
          return input
        } else {
          let placeholder = input.length < 3 ? '_'.repeat(3 - input.length) : ''
          return `${ input }${ placeholder }${ chalk.gray`.myshopify.com` }`
        }
      },
    })
  }
}

const ADMIN_PAGES = [
  { name: 'Dashboard (Admin Homepage)', value: '' },
  { name: 'Products', value: 'products' },
  { name: 'Collections', value: 'collections' },
  { name: 'Apps', value: 'apps' },
  { name: 'Themes', value: 'themes' },
  { name: 'Pages', value: 'pages' },
  { name: 'Blogs', value: 'blogs' },
  { name: 'Articles', value: 'articles' },
  { name: 'Navigation', value: 'menus' },
  { name: 'Redirects', value: 'redirects' },
  { name: 'Files', value: 'settings/files' },
  { name: 'Metafields', value: 'metafields' },
  { name: 'Store Preferences', value: 'online_store/preferences' },
  { name: 'Settings', value: 'settings/general' },
]

async function getAdminPage() {
  return await inquirer.prompt({
    name: 'page',
    type: 'autocomplete',
    message: 'Select the Admin page',
    source: async (answers, input = '') => fuzzy
      .filter(input, ADMIN_PAGES, {
        extract: el => el.name,
      })
      .map(el => el.original),
  })
}

let { store } = await getStore()
let { page } = await getAdminPage()
let url = `https://${ processStoreName(store) }/admin/${ page }`

console.log(`Opening ${ chalk.green(url) }`)

exec(`open ${ url }`)
