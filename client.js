module.exports = `;(function () {
  ${require('fs').readFileSync(`${__dirname}/_client.js`)}
})();`
