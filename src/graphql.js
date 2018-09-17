'use strict'

require('./config')

const { ApolloServer } = require('apollo-server-lambda')
const { createConfigFromModels } = require('./util/graphql')
const models = require('./models')

const server = new ApolloServer({
  ...createConfigFromModels(models)
})

module.exports.handler = server.createHandler()
