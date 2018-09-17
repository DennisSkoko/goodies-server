'use strict'

const { gql } = require('apollo-server-lambda')
const _ = require('lodash/fp')
const db = require('../db')
const { toCamelCase } = require('../util')

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
    recipes: () => db.scan({
      TableName: process.env.GOODIES_RECIPES_TABLE
    })
      .promise()
      .then(_.get('Items'))
      .then(_.map(toCamelCase))
  }
}
