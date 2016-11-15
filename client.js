module.exports = (address = 'http://localhost:9909') => `;(function () {
  var es = new window.EventSource('${address}')
  es.onmessage = function (event) {
    setTimeout(function () {
      console.log('[hot-rld] ' + event.data + ' updated')
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = event.data + '?cachebust=' + Date.now()
      var prevNode = document.querySelector('[src^="' + event.data + '"]')
      if (!prevNode) return console.log('[hot-rld] cannot find <script> tag to replace')
      prevNode.parentNode.replaceChild(script, prevNode)
    }, 500)
  }
})();`
