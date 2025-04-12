import express, {type Request, type Response} from 'express'
import { handlerError } from './components/decorators';
import { TaskDTO, TaskDTORelation } from '../schemas/dto/taskDTO';
import TaskService from '../app/taskService';
import UserService from '../app/user';
import { UserDataDTO } from '../schemas/dto/userDTO';

const userRouter = express.Router()

class UserController{ // рефешни токен
    constructor() {
        userRouter.get("/get-data", this.getData.bind(this))
    }

    @handlerError()
    async getData(req: Request, res: Response){
        const userId = req.tokenPayload.id
        const data: UserDataDTO = await UserService.getData(userId)
        res.status(200).json(data)
    }
}

new UserController()

export default userRouter