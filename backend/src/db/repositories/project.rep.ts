import { EntityManager } from "typeorm";
import { ProjectBaseDTO, ProjectDTO, UpdatePriorityProjectDTO } from "../../schemas/dto/projectDTO";
import db from "../db";
import { ProjectORM, UserProjectORM } from "../orm/userOrm";

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

    async updateProject(newData: ProjectDTO){
        const project = await this.findOne({
            where: {id: newData.id}
        })
        if (!project)
            throw new Error("project dont exist")
        Object.keys(project).forEach(key => {
            const typedKey = key as keyof ProjectDTO;  // Уточнение типа ключа
            (project as any)[typedKey] = newData[typedKey];
        })
        await this.save(project)
    },

    async deleteProject(idProject: number){
        const result = await this.delete(idProject);
        if (result.affected === 0) {
            throw new Error("Project not found");
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

    async changePriority(data: UpdatePriorityProjectDTO, userId: number){
        // const getProjByPriority = async (priority: number) => {
        //     return await db.getRepository(UserProjectORM).findOne({
        //         where: {user: {id: userId}, project: {id: data.project.id}, priority: priority}
        //     })
        // }

        // const userProjectFirst = await getProjByPriority(data.newPriority)
        // const userProjectSecond = await getProjByPriority(data.project.priority)
    }
})