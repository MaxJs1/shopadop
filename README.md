# `shopadop` — Shopify Admin Opener

## Installation

`npm install -g shopadop`

`npx shopadop`

## Configuration

Seup config file either in `.shopifystores` or `package.json`. Otherwise, `shopadop` will ask for a store name each time.

```yaml
# .shopifystores

mystorename.myshopify.com
mystorename2  # mystorename2.myshopify.com
```

```json
// package.json

{
  ...
  "shopify": {
    "store": "mystorename.myshopify.com",
    // or
    "store": "mystorename",
    // or
    "store": [
      "mystorename.myshopify.com",
      "mystorename2"  // mystorename2.myshopify.com
    ]
  }
}
```

```ts
interface ShopifyPkgConfig {
  store?: string | string[]
}
```

\* `'.myshopify.com'` is optional.

## Admin pages

- Dashboard (Admin Homepage)
- Products
- Collections
- Apps
- Themes
- Pages
- Blogs
- Articles
- Navigation
- Redirects
- Files
- Metafields
- Store Preferences
- Settings
