'use strict'

require('./config')

const { ApolloServer } = require('apollo-server-lambda')
const { createConfigFromModels } = require('./util')
const models = require('./models')

const IS_PROD = process.env.NODE_ENV === 'production'

const server = new ApolloServer({
  ...createConfigFromModels(models),
  playground: !IS_PROD,
  debug: !IS_PROD,
  tracing: !IS_PROD
})

module.exports.handler = server.createHandler({
  cors: {
      origin: true
  }
})
