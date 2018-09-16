'use strict'

const { DynamoDB } = require('aws-sdk')

export const db = new DynamoDB.DocumentClient()
