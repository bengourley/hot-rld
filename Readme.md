# hot-rld

Hot reload for browser js files.

## Usage

Start a web server that will watch your compiled bundle for a changes and notify the client via
[SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events).

```
hot-rld -b static/js/bundle.js -s /static/js/bundle.js
```

- `-b`  is the route to your bundle on the file system (relative to `process.cwd()`)
- `-s` should match the `src` attribute of the `<script>` tag on your page

_Tip: prefix this command with `./node_modules/.bin/` if it's not already in your path._

Inject the tiny client script in your development page. This speaks to the SSE server
and injects new builds of your bundle as and when they are created:

```js
const client = require('hot-rld/client')
`<script>${client()}</script>`
```

## Installation
```sh
$ npm install hot-rld
```

## License
[MIT](https://tldrlegal.com/license/mit-license)
