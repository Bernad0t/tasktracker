import { EntityManager } from "typeorm";
import db from "../db";
import { ProjectORM, UserORM, UserProjectORM } from "../orm/userOrm";
import { UpdatePriorityProjectDTO } from "../../schemas/dto/projectDTO";
import { Role } from "../../schemas/enums/userEnum";

export const UserProjectRepository = db.getRepository(UserProjectORM).extend({
    async findUserProjectById(userProjectId: number){
        return await this.findOne({where: {id : userProjectId}})
    },

    async findUserProjectByFields(userId: number, projectId: number){
        return await this.findOne({where: {user : {id: userId}, project : {id: projectId}}})
    },

    async connectChildAndParent(projectId: number, manager?: EntityManager, userId?: number){
        const userProjectRepo = manager ? manager.getRepository(UserProjectORM) : this
        const whereCondition: any = { project: { id: projectId } };
        if (userId !== undefined) {
            whereCondition.user = { id: userId };
        }
        const userProjects = await userProjectRepo.find({
            where: whereCondition,
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
        await userProjectRepo.delete(whereCondition);
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
                "project", "parent", "child", "parent.project", "child.project", 
                // "user", "parent.project", "child.project", "parent.user",  "child.user"
                // "project.tasks", "parent.project.tasks", "child.project.tasks",
                // "project.tasks.reviewer", "project.tasks.assigned", 
            ]
        })
        return projects
    },

    async addUserInProject(project: ProjectORM, user: UserORM, role: Role){
        const newUserProj = new UserProjectORM()
        newUserProj.role= role
        newUserProj.project = project
        newUserProj.user = user
        newUserProj.parent = null

        const thisUserProjects = await this.getProjects(user.id)
        console.log("thisUserProjects", thisUserProjects)
        const headThisUserProjects = thisUserProjects.find(proj => proj.parent == null) ?? null
        newUserProj.child = headThisUserProjects
        await this.save(newUserProj)
        if (headThisUserProjects){
            headThisUserProjects.parent = newUserProj
            await this.save(headThisUserProjects)
        }
    },

    async updateUserInProject(projectId: number, userId: number, role: Role){
        const current = await this.findOne({
            where: {project: {id: projectId}, user: {id: userId}}
        })
        if (current){
            current.role = role
            await this.save(current)
        }
    },

})