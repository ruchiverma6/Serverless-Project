 import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { getTodo } from '../../helpers/todos'
import { deleteToDo } from '../../helpers/todos'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger';

const logger = createLogger('deleteTodo');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info(`Processing event: ${event}`)
    const todoId = event.pathParameters.todoId
    const userId = getUserId(event)
    const item = await getTodo(userId, todoId)
    if(item.length==0){
      logger.error(`Delete URL denied, not your todo`)
     return {
       statusCode: 404,
       body: 'todoId does not exist'
     }
    }
    await deleteToDo(userId, todoId)
    return {
      statusCode: 200,
      body: ''
    }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
 