import processArgs from './process-args.js'
import getConfig from './get-config.js'
import inquirer from 'inquirer'
import fuzzy from 'fuzzy'

export default async function() {
  let store = processArgs().store || getConfig()

  if (typeof store === 'object' && !!store.length && store.every(s => s !== '')) {
    return await inquirer.prompt({
      name: 'store',
      type: 'autocomplete',
      message: 'Select a store',
      source: async (answers, input = '') => fuzzy
        .filter(input, store)
        .map(el => el.original),
    })
  }

  else if (typeof store === 'string' && store !== '') {
    return { store }
  }

  else {
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
