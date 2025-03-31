import { ProjectORM, UserORM } from "../db/orm/userOrm";
import { ProjectRepository } from "../db/repositories/project.rep";
import { TaskRepostiry } from "../db/repositories/task.rep";
import { UserRepository } from "../db/repositories/user.rep";
import { TaskDTO, TaskDTORelation } from "../schemas/dto/taskDTO";

class TaskServiceClass{
    async addTask(task: TaskDTO){
        const reviewer: UserORM = await UserRepository.findUserQueryOR({id: task.reviewer})
        const assigned: UserORM = await UserRepository.findUserQueryOR({id: task.assigned})
        const project: ProjectORM = await ProjectRepository.getProjectById(task.project)
        if (!reviewer || !assigned || !project)
            throw new Error("unreal create task")
        await TaskRepostiry.addTask(task, project, reviewer, assigned)
    }

    async updateTask(task: TaskDTORelation){
        await TaskRepostiry.updateTask(task)
    }

    async deleteTask(taskId: number){
        await TaskRepostiry.deleteTask(taskId)
    }
}

const TaskService = new TaskServiceClass
export default TaskService