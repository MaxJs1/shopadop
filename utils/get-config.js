import fs from 'fs'
import processStoreName from './process-store-name.js'
import log from './log.js'

export default function() {
  const config = fs.existsSync('.shopifystores') &&
    fs.readFileSync('.shopifystores', 'utf8')
      .split(/\n/)
      .filter(line => !/^#\s*/.test(line))
      .filter(Boolean)

  const pkg = fs.existsSync('package.json') && JSON.parse(fs.readFileSync('package.json'))

  let stores = config || pkg.shopify?.store

  if (typeof stores === 'object') {
    if (stores.length === 1) {
      log.selected('Store', processStoreName(stores))
      return stores[0]
    } else {
      return stores.map(processStoreName)
    }
  }

  else if (typeof stores === 'string') {
    log.selected('Store', processStoreName(stores))
    return stores
  }

  return stores
}
