
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dicty-components-page-editor.cjs.production.min.js')
} else {
  module.exports = require('./dicty-components-page-editor.cjs.development.js')
}
