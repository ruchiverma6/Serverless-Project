import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate';
import { CreateTodoRequest } from '../requests/CreateTodoRequest'

const XAWS = AWSXRay.captureAWS(AWS)

export class TodosAccess {
    constructor(
        // this line gave me error, with AWs was fine but not with XAWS
        private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
        private readonly todosTable = process.env.TODOS_TABLE
        ){

        }
// TODO: Implement the dataLayer logic
 async createTodo(todoItem: TodoItem): Promise<TodoItem>  {

    await this.docClient.put({
        TableName: this.todosTable,
        Item: todoItem,
      }).promise()
      return Promise.resolve(todoItem)
}    
}

