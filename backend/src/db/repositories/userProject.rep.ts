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
        const userProjectRepo = manager.getRepository(UserProjectORM)
        const userProjects =  await userProjectRepo.find({
            where: {project: {id: projectId}},
            relations: ['parent', 'child']
        })

        for (const up of userProjects) {
            // Сохраняем ссылки перед обнулением
            const parent = up.parent;
            const child = up.child;

            // Разрываем связи
            if (parent) {
                parent.child = child || null;
            }
            if (child) {
                child.parent = parent || null;
            }

            // Обнуляем и сохраняем текущую запись
            up.parent = null;
            up.child = null;
            await userProjectRepo.save(up);
            parent && await userProjectRepo.save(parent);
            child && await userProjectRepo.save(child);
        }

        // Затем удаляем все связи проекта
        await userProjectRepo.delete({
            project: { id: projectId }
        });
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
            relations: [
                "project", "parent", "child", "user",
                "parent.project", "child.project", "parent.user",  "child.user"
                // "project.tasks", "parent.project.tasks", "child.project.tasks",
                // "project.tasks.reviewer", "project.tasks.assigned", 
            ]
        })
        return projects
    }
})