#!/usr/bin/env node

import { readFile } from 'fs/promises'
import inquirer from 'inquirer'
import autocomplete from 'inquirer-autocomplete-prompt'
import fuzzy from 'fuzzy'
import open from 'open'

inquirer.registerPrompt('autocomplete', autocomplete)

async function getStoreData() {
  const pkg = JSON.parse(await readFile('./package.json'))

  return pkg.shopify?.store
}

async function getStore() {
  let store = await getStoreData()

  if (typeof store === 'object' && !!store.length && store.every(s => s !== '')) {
    return await inquirer.prompt({
      name: 'store',
      type: 'autocomplete',
      message: 'Select a store',
      source: async (answers, input = '') => fuzzy
        .filter(input, store.map(s => s.replace('.myshopify.com', '')))
        .map(el => el.original),
    })
  } else if (typeof store === 'string') {
    return store.replace('.myshopify.com', '')
  } else {
    return await inquirer.prompt({
      name: 'store',
      type: 'input',
      message: 'Enter your store name',
      transformer: input => {
        return `${ input }${ input.length < 3 ? '_'.repeat(3 - input.length) : '' }.myshopify.com`
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
    source: async (answers, input = '') => await fuzzy
      .filter(input, ADMIN_PAGES, {
        extract: el => el.name,
      })
      .map(el => el.original),
  })
}

let { store } = await getStore()
let { page } = await getAdminPage()

open(`https://${ store }.myshopify.com/admin/${ page }`)
