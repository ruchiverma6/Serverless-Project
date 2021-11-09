import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
//import { getUserId } from '../utils';
import { createToDO } from '../../helpers/todos'
//import * as uuid from 'uuid'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    const newItem = await createToDO(newTodo);
  
return {
  statusCode: 201,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  body: JSON.stringify({
    newItem
  })
}
  }
)

handler.use(
  cors({
    credentials: true
  })
)
