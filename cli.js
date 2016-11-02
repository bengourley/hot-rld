#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2))

const help = `
  hot-rld
  usage: hot-rld -b path/to/bundle.js -s /web/route/to/bundle.js

  -b --bundle [required]
    Path to the js bundle that you want to watch
    for changes/updates.

  -s --src [required]
    The path to the js bundle as it exists in
    the <script src=""> attribute in your html.

  -p --port [optional] [default: 9909]
    The port you want the web server to listen on.

`

if (argv.help || argv.h) return console.log(help)

const bundlePath = argv.b || argv.bundle
const scriptSrc = argv.s || argv.scriptSrc
const port = argv.p || argv.port || '9909'

if (!bundlePath || !scriptSrc) return console.log(help)

const sseServer = require('./server')(bundlePath, scriptSrc)

const server = (req, res) => {
  if (req.url !== '/') {
    res.writeHead(404)
    return res.end('Not found')
  }
  sseServer(req, res)
}

require('http').createServer(server).listen(port, '127.0.0.1', () => {
  console.log(`[🔥 ] hot app reload server listening on http://localhost:${port}/`)
})
