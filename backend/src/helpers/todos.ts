import { createUploadPresignedUrl } from '../helpers/attachmentUtils';
import { TodosAccess } from './todosAcess'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
//import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import { createLogger } from '../utils/logger';

const logger = createLogger('deleteTodo');
//import * as createError from 'http-errors'
const todosAccess = new TodosAccess()
 export async function createToDO(createToDoReq:CreateTodoRequest, userIdVal:string): Promise<TodoItem>{
 const timestamp = new Date().toISOString()
   var done = false
    const itemId = uuid.v4()
  if(new Date().getTime()>new Date(createToDoReq.dueDate).getTime()){
       done = true;
  }
    
    return await todosAccess.createTodo({
        todoId: itemId,
        userId: userIdVal,
        done: done,
        attachmentUrl: "",
        createdAt: timestamp,
        name: createToDoReq.name,
        dueDate: createToDoReq.dueDate
      })
    }

    export async function getTodosForUser(userId:string): Promise<any>{
      logger.info(`Getting todos for ${userId}`)
    return await todosAccess.getAllTodos(userId)
    }

    export async function updateTodo(updateTodoRequest: UpdateTodoRequest, userId: string, todoId: string): Promise<TodoItem>{
      logger.info(`Update todo ${todoId} for user ${userId}`)
      return await todosAccess.updateTodo({
          userId,
          todoId,
          name: updateTodoRequest.name,
          dueDate: updateTodoRequest.dueDate,
          done: updateTodoRequest.done
      })
  }

 export async function getTodo(userId:string, todoId:string):Promise<TodoItem[]>{
  logger.info(`getTodo for ${todoId}`)
   return await todosAccess.getTodoForUser(userId,todoId)
 }


 export async function deleteToDo(userId:string, todoId:string){
  logger.info(`Deleting todo ${todoId} from user ${userId}`)
   await todosAccess.deleteToDo(userId,todoId)
 }

 export async function createAttachmentPresignedUrl(userId:string, todoId:string):Promise<string>{
  logger.info(`createAttachmentPresignedUrl ${todoId} for user ${userId}`)
      const uploadUrl = await createUploadPresignedUrl(todoId)
      await todosAccess.updateAttachmentUrl(userId, todoId, uploadUrl)
      return uploadUrl;
 }
  