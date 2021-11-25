 import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { updateTodo } from '../../helpers/todos'
import { getTodo } from '../../helpers/todos'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger';

const logger = createLogger('deleteTodo');
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info(`Processing event: ${event}`)
    const todoId = event.pathParameters.todoId
    const userId = await getUserId(event)
   const item = await getTodo(userId, todoId)
   if(item.length==0){
    logger.error(`Update URL denied, not your todo`)
    return {
      statusCode: 404,
      body: 'todoId does not exist'
    }
   }
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
   const items = await updateTodo(updatedTodo, userId, todoId)

return{
  statusCode: 200,
  body: JSON.stringify(items)
}
  })


handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
 