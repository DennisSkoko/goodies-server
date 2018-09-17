'use strict'

const { gql } = require('apollo-server-lambda')
const _ = require('lodash/fp')

const root = gql`
type Query
type Mutation
`

module.exports = {
  createConfigFromModels: models => _.reduce(
    ({ typeDefs, resolvers }, model) => ({
      typeDefs: [
        ...typeDefs,
        model.typeDef
      ],
      resolvers: _.merge(resolvers, model.resolvers)
    }),
    {
      typeDefs: [root],
      resolvers: {}
    },
    Object.values(models)
  )
}
