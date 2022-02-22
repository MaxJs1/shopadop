# `shopadop` — Shopify Admin Opener

Quickly open a specific Shopify admin page.

## Installation

```sh
npm install --global shopadop
```

```sh
npx shopadop
```

## Configuration

Example:
```sh
echo 'my-storename' >> .shopifystores
shopadop
```

Configure store(s) either in a `.shopifystores` file or in `package.json`. Otherwise, `shopadop` will ask for a store name each time.

Store name can be the `*.myshopify.com` domain name or the direct domain name.

```yaml
# .shopifystores

my-storename	# my-storename.myshopify.com
my-storename-2.myshopify.com
my-store.com
```

```js
// package.json

{
	...
	"shopify": {
		"store": "my-storename",
		// or "my-storename-2.myshopify.com"
		// or "my-store.com"
		"store": [
			"my-storename"	// my-storename.myshopify.com
			"my-storename-2.myshopify.com",
			"my-store.com"
		]
	}
}
```

## Options

| Option | Description | Example |
| --- | --- | --- |
| `-s`<br>`--store` | Store name | `-store=my-storename`<br>`-s=my-storename-2.myshopify.com -s=my-store.com` |
| `-H`<br>`--home` | Skip Admin page selection | |
| `-P`<br>`--products` | Skip Admin page selection | |
| `-C`<br>`--collections` | Skip Admin page selection | |
| `-A`<br>`--apps` | Skip Admin page selection | |
| `-T`<br>`--themes` | Skip Admin page selection | |
| `-WP`<br>`--pages` | Skip Admin page selection | |
| `-B`<br>`--blogs` | Skip Admin page selection | |
| `-BA`<br>`--articles` | Skip Admin page selection | |
| `-N`<br>`--navigation`<br>`--menus` | Skip Admin page selection | |
| `-R`<br>`--redirects` | Skip Admin page selection | |
| `-F`<br>`--files` | Skip Admin page selection | |
| `-M`<br>`--metafields` | Skip Admin page selection | |
| `-O`<br>`--preferences` | Skip Admin page selection | |
| `-S`<br>`--settings` | Skip Admin page selection | |

## Admin pages

- Home
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
