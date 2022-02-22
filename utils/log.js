import chalk from 'chalk'

export default {
  selected(key, value) {
    console.log(`${ chalk.green`❯` } ${ chalk.bold(key) } ${ chalk.cyan(value) }`)
  }
}
