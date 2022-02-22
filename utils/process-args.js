import yargs from 'yargs'
import processStoreName from './process-store-name.js'
import { ADMIN_PAGES } from './get-admin-page.js'

let { argv } = yargs(process.argv)

export default function() {
  // -s, --store
  let store_arg = argv['s'] || argv['store']
  let store =
    typeof store_arg === 'object' ? store_arg.map(processStoreName) :
    typeof store_arg === 'string' ? processStoreName(store_arg) :
    null

  // skip admin page selection
  let page = ADMIN_PAGES.find(pg => pg.flags.some(flag => !!argv[flag]) || null)

  return {
    store,
    page,
  }
}
