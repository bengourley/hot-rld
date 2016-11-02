const gaze = require('gaze')
const uid = require('hat')
const path = require('path')

const prefix = '[hot-rld]'

module.exports = (bundlePath, scriptSrc) => {
  const clients = new Set()

  gaze(path.resolve(process.cwd(), bundlePath), (err, watcher) => {
    if (err) return console.log(prefix, err.stack)
    const watched = watcher.relative()
    console.log(`${prefix} watching ${Object.keys(watched).map(k => `${k}${watched[k]}`).join(', ')}`)
    watcher.on('changed', (file) => {
      console.log(`${prefix} bundle update detected`)
      for (const client of clients) client.write(`data: ${scriptSrc}\n\n`)
    })
  })

  return (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    })
    res.write('\n')
    const clientId = uid()
    console.log(`${prefix} client #${clientId}: connected`)
    clients.add(res)
    req.on('close', () => {
      console.log(`${prefix} client #${clientId}: disconnected`)
      clients.delete(res)
    })
  }
}
