import { ApolloServer } from 'apollo-server-lambda'
import { Handler } from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'
import { schema } from './schema'

// config.credentials = new SharedIniFileCredentials({
//   profile: 'privat'
// })

const db = new DynamoDB.DocumentClient()

export const server = new ApolloServer({
  typeDefs: schema,
  resolvers: {
    Query: {
      recipes: () => db.scan({
        TableName: process.env.GOODIES_RECIPES_TABLE as string
      })
        .promise()
        .then(result => result.Items)
    }
  }
})

export const handler: Handler = server.createHandler()
