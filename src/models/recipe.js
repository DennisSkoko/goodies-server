'use strict'

const { gql } = require('apollo-server-lambda')
const _ = require('lodash/fp')
const uuid = require('uuid/v4')
const db = require('../db')
const { toPascalCase, toCamelCase } = require('../util')

module.exports.typeDef = gql`
type Recipe {
  id: ID!
  name: String!
}

extend type Query {
  recipes: [Recipe!]
}

input RecipeInput {
  name: String!
}

extend type Mutation {
  createRecipe(recipe: RecipeInput!): Recipe
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
  },

  Mutation: {
    createRecipe: (_root, { recipe: data }) => {
      const recipe = Object.assign(data, {
        id: uuid()
      })

      return db.put({
        TableName: process.env.GOODIES_RECIPES_TABLE,
        Item: toPascalCase(recipe)
      })
        .promise()
        .then(() => recipe)
    }
  }
}
