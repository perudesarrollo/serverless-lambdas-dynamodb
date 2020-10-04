'use strict';
const AWS = require('aws-sdk')
let options = {}
if (process.env.IS_OFFLINE) {
    options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000'
    }
}
const client = new AWS.DynamoDB.DocumentClient(options)

class DynamoDB {
    static set = async params => await client.put(params).promise()
    static get = async params => await client.scan(params).promise()
    static id = async params => await client.get(params).promise()
    static del = async params => await client.delete(params).promise()
}
module.exports = DynamoDB