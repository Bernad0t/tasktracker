import { TaskORM } from "../db/orm/taskOrm";
import { UserORM } from "../db/orm/userOrm";
import { CommentsRepository } from "../db/repositories/comments.rep";
import { TaskRepostiry } from "../db/repositories/task.rep";
import { UserRepository } from "../db/repositories/user.rep";
import { CommentCreateDTO } from "../schemas/dto/commentsDTO";

class CommServiceClass{
    async addComm(comm: CommentCreateDTO){
        const user: UserORM = await UserRepository.findUserQueryOR({id: comm.reviewer})
        const task: TaskORM | null = await TaskRepostiry.getTaskById(comm.task)
        if (!user || !task)
            throw new Error("unreal add comment")
        await CommentsRepository.addComm(comm, task, user)
    }

    async deleteComm(commId: number){
        await CommentsRepository.deleteComm(commId)
    }
}

const CommService = new CommServiceClass()
export default CommService