import processArgs from './process-args.js'
import inquirer from 'inquirer'
import autocomplete from 'inquirer-autocomplete-prompt'
import fuzzy from 'fuzzy'

inquirer.registerPrompt('autocomplete', autocomplete)

export const ADMIN_PAGES = [
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
    flags: ['WP', 'pages'],
  },
  {
    name: 'Blogs',
    value: 'blogs',
    flags: ['B', 'blogs'],
  },
  {
    name: 'Articles',
    value: 'articles',
    flags: ['BA', 'articles'],
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

export default async () => {
  let { page } = processArgs()

  if (!!page) {
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
