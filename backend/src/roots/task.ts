import express, {type Request, type Response} from 'express'
import { handlerError } from './components/decorators';
import { TaskDTO, TaskDTORelation } from '../schemas/dto/taskDTO';
import TaskService from '../app/taskService';

const taskRouter = express.Router()

class TaskController{
    constructor() {
        taskRouter.post("/add-task", this.addTask);
        taskRouter.patch("/update-task", this.updateTask);
        taskRouter.delete("/delete-task", this.deleteTask);
    }

    @handlerError()
    async addTask(req: Request, res: Response){
        const task: TaskDTO = req.body
        await TaskService.addTask(task)
        res.status(200).json("successful added task")
    }

    @handlerError()
    async updateTask(req: Request, res: Response){
        const task: TaskDTORelation = req.body
        await TaskService.updateTask(task)
        res.status(200).json("successful updated task")
    }

    @handlerError()
    async deleteTask(req: Request, res: Response){
        const taskId: number = Number(req.query.id)
        await TaskService.deleteTask(taskId)
        res.status(200).json("successful deleted task")
    }
}

new TaskController()

export default taskRouter