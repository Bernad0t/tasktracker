import { EntityManager } from "typeorm";
import { ProjectBaseDTO } from "../../schemas/dto/projectDTO";
import db from "../db";
import { ProjectORM } from "../orm/userOrm";

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
    }
})