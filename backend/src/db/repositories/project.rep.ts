import { EntityManager } from "typeorm";
import { ProjectBaseDTO, ProjectDTO, ProjectDTORelation, UpdatePriorityProjectDTO } from "../../schemas/dto/projectDTO";
import db from "../db";
import { ProjectORM, UserProjectORM } from "../orm/userOrm";
import { UserProjectRepository } from "./userProject.rep";

export const ProjectRepository = db.getRepository(ProjectORM).extend({
    async addProject(projectData: ProjectBaseDTO, manager?: EntityManager) {
        if (manager){
            const project = manager.create(ProjectORM, projectData);
            const savedProject = await manager.save(ProjectORM, project);
            return savedProject;  
        }
        else{
            const savedProject = await this.save(projectData);
            return savedProject;
        }    
    },

    async getFilteredProject(id: number, name: string){
        const projects = await this.createQueryBuilder("project")
            .leftJoinAndSelect("project.users", "userproject")
            .leftJoinAndSelect("userproject.user", "user")
            .where("user.id = :id", { id })
            .andWhere('project.name LIKE :name', { name: `%${name}%` })
            .orderBy("userproject.priority", "DESC")
            .getMany();
        return projects       
    },

    async getProjectById(id: number){
        const project = await this.findOne({
            where: {id: id}
        })
        if (!project) 
            throw new Error('project dont exist')
        return project
    },

    async updateProject(newData: ProjectDTO, manager?: EntityManager){
        const project = await this.findOne({
            where: {id: newData.id}
        })
        if (!project)
            throw new Error("project dont exist")
        Object.keys(project).forEach(key => {
            const typedKey = key as keyof ProjectDTO;  // Уточнение типа ключа
            (project as any)[typedKey] = newData[typedKey];
        })
        if (!manager)
            await this.save(project)
        else
            await manager.save(project)
    },

    async deleteProject(idProject: number){
        const queryRunner = db.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try{
            await UserProjectRepository.connectChildAndParent(idProject, queryRunner.manager)
            const result = await this.delete(idProject);
            if (result.affected === 0) {
                throw new Error("Project not found");
            }
            await queryRunner.commitTransaction()
        } catch (error){
            await queryRunner.rollbackTransaction()
            throw(error)
        } finally{
            await queryRunner.release()
        }
    },

    async getRoleUser(projectId: number, userId: number){
        const project = await db.getRepository(UserProjectORM).findOne({
            where: {user: { id: userId }, project: { id: projectId } }
        })
        if (!project)
            throw new Error("user dont exist in project")
        return project.role
    },

    async getRelationProject(projectId: number){
        const project = await this.findOne({
            where: {id: projectId},
            relations: ["users", "users.user"]
        })
        if (!project)
            throw new Error("project dont exist")
        const result: ProjectDTORelation = {
            ...project, 
            users: project.users.map(userproject => {return {...userproject.user, role: userproject.role}}),
            tasks: [] // отдельным запросом лучше, чтобы не перегружать запрос
        }
        return result
    },

    async getProjects(userId: number){
        const project = await this.find({
            where: {users: {user: {id: userId}}}
        })
        return project
    }
})