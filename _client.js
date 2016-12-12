var port = window.__HOT_RLD_PORT__ || 9909
var es = new window.EventSource('//localhost:' + port)
es.addEventListener('.js', function (event) {
  console.log('[hot-rld] ' + event.data + ' updated')
  var script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = event.data + '?cachebust=' + Date.now()
  var prevNode = document.querySelector('script[src^="' + event.data + '"]')
  if (!prevNode) return console.log('[hot-rld] cannot find <script> tag to replace')
  prevNode.parentNode.replaceChild(script, prevNode)
})
es.addEventListener('.css', function (event) {
  console.log('[hot-rld] ' + event.data + ' updated')
  var link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = event.data + '?cachebust=' + Date.now()
  var prevNode = document.querySelector('link[href^="' + event.data + '"]')
  if (!prevNode) return console.log('[hot-rld] cannot find <link> tag to replace')
  prevNode.parentNode.insertBefore(link, prevNode.nextSibling)
  function removePrevNode () { if (prevNode.parentNode) prevNode.parentNode.removeChild(prevNode) }
  link.onload = removePrevNode
  setTimeout(removePrevNode, 500)
})