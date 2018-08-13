import * as fs from 'fs'
import { gql } from 'apollo-server-core'
import { settings } from '../config'

export const schema = gql(
  fs.readFileSync(settings.graphql.pathToSchemaFile, 'utf8')
)
