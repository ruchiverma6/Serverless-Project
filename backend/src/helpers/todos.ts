//import { AttachmentUtils } from './attachmentUtils';
import { TodosAccess } from './todosAcess'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
//import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
//import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
//import * as createError from 'http-errors'
const todosAccess = new TodosAccess()
 export async function createToDO(createToDoReq:CreateTodoRequest): Promise<TodoItem>{
 const timestamp = new Date().toISOString()
    var done : Boolean = false
    const itemId = uuid.v4()
  if(new Date().getTime()>new Date(createToDoReq.dueDate).getTime()){
       done = true;
  }
    
    return await todosAccess.createTodo({
        todoId: itemId,
        userId: "",
        done: this.done,
        attachmentUrl: "",
        createdAt: timestamp,
        name: createToDoReq.name,
        dueDate: createToDoReq.dueDate
      })
    }
