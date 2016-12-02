const test = require('tape')
const client = require('../client')

test('client', t => {
  t.plan(2)
  let events = []
  const EventSource = function (url) {
    t.equal(url, '//localhost:9909', 'url should default to localhost:9909')
  }
  EventSource.prototype.addEventListener = function (event) {
    events.push(event)
  }
  window = { EventSource } // eslint-disable-line
  eval(client) // eslint-disable-line
  t.deepEqual(events, [ '.js', '.css' ], 'listeners should be added for .js and .css events')
})
