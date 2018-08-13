import * as path from 'path'

// Will be the project folder after compiling
const root = path.resolve(__dirname, '../..')

export interface Settings {
  graphql: {
    pathToSchemaFile: string
  }
}

export const settings: Settings = {
  graphql: {
    pathToSchemaFile: path.join(root, 'res/schema.gql')
  }
}
