import { ADMIN_PAGES } from './get-admin-page.js'

export default function() {
  // skip admin page selection
  let page = ADMIN_PAGES.find(pg => pg.flags.some(flag => !!argv[flag]) || null)

  return {
    store,
    page,
  }
}
