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
| `--store`<br>`-s` | Store name | `-store=my-storename`<br>`-s=my-storename-2.myshopify.com -s=my-store.com` |

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
