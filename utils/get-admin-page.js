import yargs from 'yargs'
import inquirer from 'inquirer'
import autocomplete from 'inquirer-autocomplete-prompt'
import fuzzy from 'fuzzy'
import log from './log.js'

inquirer.registerPrompt('autocomplete', autocomplete)

const ADMIN_PAGES = [
  {
    name: 'Home',
    value: '',
    flags: ['H', 'home'],
  },
  {
    name: 'Products',
    value: 'products',
    flags: ['P', 'products'],
  },
  {
    name: 'Collections',
    value: 'collections',
    flags: ['C', 'collections'],
  },
  {
    name: 'Apps',
    value: 'apps',
    flags: ['A', 'apps'],
  },
  {
    name: 'Themes',
    value: 'themes',
    flags: ['T', 'themes'],
  },
  {
    name: 'Pages',
    value: 'pages',
    flags: ['G', 'pages'],
  },
  {
    name: 'Blogs',
    value: 'blogs',
    flags: ['B', 'blogs'],
  },
  {
    name: 'Articles',
    value: 'articles',
    flags: ['Z', 'articles'],
  },
  {
    name: 'Navigation',
    value: 'menus',
    flags: ['N', 'navigation', 'menus'],
  },
  {
    name: 'Redirects',
    value: 'redirects',
    flags: ['R', 'redirects'],
  },
  {
    name: 'Files',
    value: 'settings/files',
    flags: ['F', 'files'],
  },
  {
    name: 'Metafields',
    value: 'metafields',
    flags: ['M', 'metafields'],
  },
  {
    name: 'Store Preferences',
    value: 'online_store/preferences',
    flags: ['O', 'preferences'],
  },
  {
    name: 'Settings',
    value: 'settings/general',
    flags: ['S', 'settings'],
  },
]

function getAdminPgArg() {
  let { argv } = yargs(process.argv)

  return ADMIN_PAGES.find(pg => pg.flags.some(flag => !!argv[flag]) || null)
}

export default async () => {
  let page = getAdminPgArg()

  if (!!page) {
    log.selected('Admin', page.name)

    return {
      page: page.value
    }
  }

  else {
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
}
