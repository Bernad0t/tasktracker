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
        userRouter.get("/get-user-by-login", this.getUserByLogin.bind(this))
        userRouter.delete("/logout", this.logout.bind(this))
    }

    @handlerError()
    async getData(req: Request, res: Response){
        const userId = req.tokenPayload.id
        const data: UserDataDTO = await UserService.getData(userId)
        res.status(200).json(data)
    }

    @handlerError()
    async getUserByLogin(req: Request, res: Response){
        const login = String(req.query.login)
        const data: UserDataDTO[] = await UserService.getUserByLogin(login)
        res.status(200).json(data)
    }

    @handlerError()
    async logout(req: Request, res: Response){
        console.log("cookie", req.cookies)
        res.clearCookie("refreshToken")
        res.status(200).json("successful logout")
    }
}

new UserController()

export default userRouter