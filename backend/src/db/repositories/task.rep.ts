import { TaskDTO, TaskDTORelation } from "../../schemas/dto/taskDTO";
import db from "../db";
import { TaskORM } from "../orm/taskOrm";
import { ProjectORM, UserORM } from "../orm/userOrm";
import { UserRepository } from "./user.rep";

export const TaskRepostiry = db.getRepository(TaskORM).extend({
    async addTask(task: TaskDTO, project: ProjectORM, reviewer: UserORM, assigned: UserORM){
        const newTask = new TaskORM({...task, project: project, reviewer: reviewer, assigned: assigned})
        const savedTask =  await this.save(newTask)
        return savedTask
    },

    async getTaskById(id: number){
        const task: TaskORM | null = await this.findOne({where: {id: id}})
        return task
    },

    async updateTask(task: TaskDTORelation){
        const updatableKeys = ["name", "description","status", "deadline" ]
        let taskOrm = await this.getTaskById(task.id)
        const newAssigned = await UserRepository.findUserQueryOR({id: task.assigned})
        if (!taskOrm)
            throw new Error("task dont exist")
        updatableKeys.forEach(key => taskOrm = {...taskOrm, [key]: task[key as keyof typeof task]} as TaskORM)
        if (newAssigned)
            taskOrm.assigned = newAssigned[0]
        await this.save(taskOrm)
    },

    async deleteTask(taskId: number){
        const deleted = await this.delete(taskId)
        if (!deleted)
            throw new Error("task dont exist")
    },

    async getProjectTasks(projectId: number){
        const tasks = await this.find({
            where: {project: {id: projectId}},
            relations: ["comments", "comments.reviewer", "reviewer", "assigned"]
        })
        const result: TaskDTORelation[] = tasks.map(task => {
            return {
                ...task, 
                project: projectId, 
                reviewer: task.reviewer?.id, 
                assigned: task.assigned.id,
                comments: task.comments?.map(comm => {
                    return {
                        ...comm,
                        reviewer: comm.reviewer.id,
                        task: task.id
                    }
                })
            }
        })
        return result
    }
})