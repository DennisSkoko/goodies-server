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
  steps: [RecipeStep!]!
}

type RecipeStep {
  instructions: String!
}

input RecipeInput {
  name: String!
  steps: [RecipeStepInput!]!
}

input RecipeStepInput {
  instructions: String!
}

extend type Query {
  recipes: [Recipe!]
  recipe(id: ID!): Recipe
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
      .then(
        _.map(recipe => toCamelCase({
          ...recipe,
          steps: recipe.Steps.map(toCamelCase)
        }))
      ),

    recipe: (_root, { id }) => db.get({
      TableName: process.env.GOODIES_RECIPES_TABLE,
      Key: {
        Id: id
      }
    })
      .promise()
      .then(_.get('Item'))
      .then(recipe => recipe
        ? toCamelCase({
          ...recipe,
          steps: recipe.Steps.map(toCamelCase)
        })
        : null
      )
  },

  Mutation: {
    createRecipe: (_root, { recipe: data }) => {
      const recipe = {
        ...data,
        id: uuid()
      }

      return db.put({
        TableName: process.env.GOODIES_RECIPES_TABLE,
        Item: toPascalCase({
          ...recipe,
          steps: data.steps.map(toPascalCase)
        })
      })
        .promise()
        .then(() => recipe)
    }
  }
}
