import inquirer from 'inquirer'
import autocomplete from 'inquirer-autocomplete-prompt'
import fuzzy from 'fuzzy'

inquirer.registerPrompt('autocomplete', autocomplete)

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

export default async () => await inquirer.prompt({
  name: 'page',
  type: 'autocomplete',
  message: 'Select the Admin page',
  source: async (answers, input = '') => fuzzy
    .filter(input, ADMIN_PAGES, {
      extract: el => el.name,
    })
    .map(el => el.original),
})
