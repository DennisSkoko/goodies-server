'use strict'

const _ = require('lodash/fp')

module.exports = {
  toPascalCase: _.mapKeys(key =>
    key.charAt(0).toUpperCase() + key.slice(1)
  ),

  toCamelCase: _.mapKeys(key =>
    key.charAt(0).toLowerCase() + key.slice(1)
  )
}
