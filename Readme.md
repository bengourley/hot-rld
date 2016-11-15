# hot-rld

Hot reload for css/js files.

## Usage

Start a web server that will watch your static asset bundles (js/css) for changes and notify the client via
[SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events).

The client will replace the `<script>` or `<link>` elements with the updated (and cachebusted) link, causing
the browser to load the new contents.

```
hot-rld -s static js/*.js css/*.css ...
```

- `-s` is the path to where your static assets are served from
- followed by one or many globs to files to watch, relative to the static assets

_Tip: prefix this command with `./node_modules/.bin/` if it's not already in your path._

Inject the tiny client script in your development page. This speaks to the SSE server
and injects new builds of your bundle as and when they are created:

```js
const html = `<script>${require('hot-rld/client')}</script>`
```

## Installation
```sh
$ npm install --save-dev hot-rld
```
or
```sh
$ yarn add --dev hot-rld
```

## Known issues

Replacing an entire js file is likely to cause a ton of side-effects, so be mindful of
what you use it on. This was built for [choo](yoshuawyuts/choo) apps which are functional
in nature. However, `subscriptions` and other one-time setup side effects can still be a
pain. You have been warned 😔!

## License
[MIT](https://tldrlegal.com/license/mit-license)
