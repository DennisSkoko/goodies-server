'use strict'

const { gql } = require('apollo-server-lambda')

module.exports.typeDef = gql`
type Recipe {
  id: ID!
  name: String!
}

extend type Query {
  recipes: [Recipe!]
}
`

module.exports.resolvers = {
  Query: {
    recipes: () => [
      {
        id: '1',
        name: 'Soppa'
      },
      {
        id: '2',
        name: 'Kyckling'
      }
    ]
  }
}
