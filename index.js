#!/usr/bin/env node

import fs from 'fs'
import chalk from 'chalk'
import inquirer from 'inquirer'
import autocomplete from 'inquirer-autocomplete-prompt'
import fuzzy from 'fuzzy'
import open from 'open'

inquirer.registerPrompt('autocomplete', autocomplete)

async function getConfig() {
  const config = fs.existsSync('.shopifystores') && fs.readFileSync('.shopifystores', 'utf8').split(/\n/).filter(Boolean)
  const pkg = JSON.parse(fs.readFileSync('./package.json'))

  let stores = config || pkg.shopify?.store

  if (!!stores?.length) {
    return stores.map(s => s.includes('.')
      ? s
      : s += '.myshopify.com'
    )
  }

  return stores
}

async function getStore() {
  let store = await getConfig()

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
    return store.replace('.myshopify.com', '')
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

let domain = store.includes('.') ? store : `${ store }.myshopify.com`

open(`https://${ domain }/admin/${ page }`)
