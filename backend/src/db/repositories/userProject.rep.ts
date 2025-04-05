import { EntityManager } from "typeorm";
import db from "../db";
import { UserProjectORM } from "../orm/userOrm";
import { UpdatePriorityProjectDTO } from "../../schemas/dto/projectDTO";
import { Role } from "../../schemas/enums/userEnum";

export const UserProjectRepository = db.getRepository(UserProjectORM).extend({
    async findUserProjectById(userProjectId: number){
        return await this.findOne({where: {id : userProjectId}})
    },

    async findUserProjectByFields(userId: number, projectId: number){
        return await this.findOne({where: {user : {id: userId}, project : {id: projectId}}})
    },

    async connectChildAndParent(projectId: number, manager: EntityManager){
        const userProjects =  await this.find({
            where: {project: {id: projectId}}
        })
        for (const project of userProjects){
            const parent = project.parent
            if (parent)
                parent.child = project.child
            const child = project.child
            if (child)
                child.parent = parent
            await manager.save(parent)
            await manager.save(child)
        }
    },

    async changePriority(data: UpdatePriorityProjectDTO, userId: number){ // delete еще отредактируй
        const queryRunner = db.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try{
            const userProject = await this.findUserProjectByFields(userId, data.project.id)
            if (!userProject)
                throw new Error("project dont exist")
            await this.connectChildAndParent(userProject.id, queryRunner.manager)

            const replacedProject = await this.findUserProjectByFields(userId, data.replacedId)
            if (!replacedProject)
                throw new Error("replaced project dont exist")
            userProject.child = replacedProject
            userProject.parent = replacedProject.parent
            replacedProject.parent = userProject
            await queryRunner.manager.save(userProject)
            await queryRunner.manager.save(replacedProject)
            await queryRunner.commitTransaction()
        } catch (error){
            await queryRunner.rollbackTransaction()
            throw error
        } finally{
            await queryRunner.release()
        }
    },

    async updateRole(projectId: number, userId: number, newRole: Role){
        const project = await this.findUserProjectByFields(userId, projectId)
        if (!project)
            throw new Error("project dont exist")
        project.role = newRole
        await this.save(project)
    },

    async getProjects(userId: number){
        const projects = await this.find({
            where: {user: {id: userId}},
            relations: ["project", "parent", "child", "parent.project", "child.project"]
        })
        return projects
    }
})