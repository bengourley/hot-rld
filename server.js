const gaze = require('gaze')
const uid = require('hat')
const path = require('path')

const prefix = '[hot-rld]'

module.exports = (staticPath, globs, webPrefix) => {
  const clients = new Set()

  globs.forEach(glob => {
    gaze(path.resolve(staticPath, glob), (err, watcher) => {
      if (err) return console.log(prefix, err.stack)
      const watched = watcher.relative()
      console.log(`${prefix} watching ${Object.keys(watched).map(k => `${k}${watched[k]}`).join(', ')}`)
      watcher.on('changed', (file) => {
        console.log(`${prefix} update detected ${file}`)
        for (const client of clients) {
          client.write(`event: ${path.extname(file)}\n`)
          client.write(`data: ${webPrefix}/${path.relative(staticPath, file)}\n\n`)
        }
      })
    })
  })

  setInterval(() => {
    // 💛 beat
    for (const client of clients) client.write(`\n\n`)
  }, 10 * 1000)

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
