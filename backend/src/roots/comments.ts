import express, {type Request, type Response}  from 'express';
import { CommentCreateDTO } from '../schemas/dto/commentsDTO';
import CommService from '../app/commService';

const commentsRouter = express.Router()

class CommentsController{
    constructor(){
        commentsRouter.post('/add-comm', this.addComment.bind(this))
        commentsRouter.delete('/delete-comm', this.deleteComm.bind(this))
    }

    async addComment(req: Request, res: Response){
        const comm: CommentCreateDTO = req.body
        await CommService.addComm(comm)
        res.status(200).json("successful added comm")
    }

    async deleteComm(req: Request, res: Response){
        const idComm: number = Number(req.query.id)
        await CommService.deleteComm(idComm)
        res.status(200).json("successful added comm")
    }
}

new CommentsController()
export default commentsRouter