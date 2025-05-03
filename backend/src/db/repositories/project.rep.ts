import { EntityManager } from "typeorm";
import { ProjectBaseDTO, ProjectDTO, ProjectDTORelation } from "../../schemas/dto/projectDTO";
import db from "../db";
import { ProjectORM, UserProjectORM } from "../orm/userOrm";
import { UserProjectRepository } from "./userProject.rep";
import { UserDataRolesDTO } from "../../schemas/dto/userDTO";

export const ProjectRepository = db.getRepository(ProjectORM).extend({
    async createProject(projectData: ProjectBaseDTO, manager?: EntityManager) {
        const repository = manager?.getRepository(ProjectORM) ?? this
        const savedProject = await repository.save({name: projectData.name, description: projectData.description});
        return savedProject;
    },

    async getFilteredProject(id: number, name: string){
        const projects = await this.createQueryBuilder("project")
            .leftJoinAndSelect("project.users", "userproject")
            .leftJoinAndSelect("userproject.user", "user")
            .where("user.id = :id", { id })
            .andWhere('project.name LIKE :name', { name: `%${name}%` })
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
        const ProjectRepository =  queryRunner.manager.getRepository(ProjectORM)
        try{
            await UserProjectRepository.connectChildAndParent(idProject, queryRunner.manager)
            const result = await ProjectRepository.delete(idProject);
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

    async getUsersInProject(projectId: number): Promise<UserDataRolesDTO[]>{
        const project = await this.findOne({
            where: {id: projectId},
            relations: ["users", "users.user"]
        })
        const returned: UserDataRolesDTO[] = project?.users.map(projuser => {return {role: projuser.role, ...projuser.user}}) ?? []
        return returned
    },

    async getRelationProject(projectId: number){ // не учел порядок
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
            where: {users: {user: {id: userId}}},
            relations: ["users.parent", "users.child"]
        })
        return project
    }
})