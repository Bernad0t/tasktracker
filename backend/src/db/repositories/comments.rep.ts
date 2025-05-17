import { CommentCreateDTO } from "../../schemas/dto/commentsDTO";
import db from "../db";
import { CommentsORM, TaskORM } from "../orm/taskOrm";
import { UserORM } from "../orm/userOrm";

export const CommentsRepository = db.getRepository(CommentsORM).extend({
    async addComm(comm: CommentCreateDTO, taskOrm: TaskORM, reviewer: UserORM){
        const newComm = new CommentsORM({...comm, task: taskOrm, reviewer: reviewer})
        return await this.save(newComm)
    },

    async deleteComm(commId: number){
        const deleted = await this.delete(commId)
        if (!deleted)
            throw new Error("unreal delete comment")
    }
})