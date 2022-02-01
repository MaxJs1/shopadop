import yargs from 'yargs'
import processStoreName from './process-store-name.js'

let { argv } = yargs(process.argv)

export default function() {
  let store_arg = argv.s || argv.store
  let store =
    typeof store_arg === 'object' ? store_arg.map(processStoreName) :
    typeof store_arg === 'string' ? processStoreName(store_arg) :
    null

  return ({ store })
}
