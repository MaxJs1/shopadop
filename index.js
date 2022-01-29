#!/usr/bin/env node

import { readFile } from 'fs/promises'
import inquirer from 'inquirer'
import autocomplete from 'inquirer-autocomplete-prompt'
import fuzzy from 'fuzzy'
import open from 'open'

inquirer.registerPrompt('autocomplete', autocomplete)

async function getStoreData() {
  const pkg = JSON.parse(await readFile('./package.json'))

  let store = pkg.shopify?.store

  if (!store) {
    console.error('"shopify.store" is not defined in package.json')
    return
  }

  return store
}

async function getStore() {
  let store = await getStoreData()

  if (typeof store === 'object') {
    return await inquirer.prompt({
      name: 'store',
      type: 'autocomplete',
      message: 'Select a store',
      source: async (answers, input = '') => await fuzzy.filter(input, store).map(el => el.original),
    })
  } else {
    return store
  }
}

const ADMIN_PAGES = [
  { name: 'Dashboard', value: '' },
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

open(`https://${ store }/admin/${ page }`)
