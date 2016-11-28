#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2))
const path = require('path')

const help = `
  hot-rld
  usage: hot-rld -s static [glob ...]

  -s --static
    The static directory served by your web server.

  -w --web-prefix [optional]
    The prefix path to your static assets, if different
    to the name of the static directory.

  -p --port [optional] [default: 9909]
    The port you want the web server to listen on.
`

const run = () => {
  if (argv.help || argv.h) return console.log(help)

  const port = argv.p || argv.port || '9909'
  const globs = argv._
  const staticPath = argv.s || argv.static
  const webPrefix = argv.w || argv['web-prefix'] || `/${staticPath}`

  if (!globs.length || !staticPath) return console.log(help)

  const sseServer = require('./server')(path.resolve(process.cwd(), staticPath), globs, webPrefix)

  const server = (req, res) => {
    if (req.url !== '/') {
      res.writeHead(404)
      return res.end('Not found')
    }
    sseServer(req, res)
  }

  require('http').createServer(server).listen(port, () => {
    console.log(`[🔥 ] hot app reload server listening on http://0.0.0.0:${port}/`)
  })
}

run()
