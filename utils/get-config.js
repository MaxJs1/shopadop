import fs from 'fs'
import processStoreName from './process-store-name.js'
import chalk from 'chalk'

export default function() {
  const config = fs.existsSync('.shopifystores') &&
    fs.readFileSync('.shopifystores', 'utf8')
      .split(/\n/)
      .filter(line => !/^#\s*/.test(line))
      .filter(Boolean)

  const pkg = fs.existsSync('package.json') && JSON.parse(fs.readFileSync('package.json'))

  let stores = config || pkg.shopify?.store

  if (!!stores) {
    if (typeof stores === 'string') {
      console.log(`${ chalk.green`❯` } ${ chalk.bold`Using store` } ${ chalk.cyan(processStoreName(stores)) }`)
      return stores
    } else {
      return stores.map(processStoreName)
    }
  }

  return stores
}
