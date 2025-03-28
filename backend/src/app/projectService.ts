import db from "../db/db";
import { ProjectORM } from "../db/orm/userOrm";
import { ProjectRepository } from "../db/repositories/project.rep";
import { UserRepository } from "../db/repositories/user.rep";
import { UserProjectRepository } from "../db/repositories/userProject.rep";
import { CreateProjectDTO, ProjectDTO, ProjectDTORelation, UpdatePriorityProjectDTO, UserRoleInProjectDTO } from "../schemas/dto/projectDTO";

export const ProjectService = {
    async addProject(project: CreateProjectDTO){
        const queryRunner = db.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction();
        try{
            const projectOrm: ProjectORM = await ProjectRepository.addProject(project, queryRunner.manager)
            for (let user of project.users){
                await UserRepository.addProject(projectOrm, user, queryRunner.manager)
            }
            await queryRunner.commitTransaction();
        } catch (error) {
            // Откат транзакции
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            // Завершение транзакции
            await queryRunner.release();
        }
    },

    async getFilteredProject(idUser: number, filter: string){
        return await ProjectRepository.getFilteredProject(idUser, filter)
    },

    async addUserIntoProject(user: UserRoleInProjectDTO, idProject: number){
        const project = await ProjectRepository.getProjectById(idProject)
        await UserRepository.addProject(project, user)
    },

    async updateProject(project: ProjectDTORelation){
        await ProjectRepository.updateProject(project)
        for (const user of project.users){
            await UserProjectRepository.updateRole(project.id, user.id, user.role)
        }
    },

    async deleteProject(projectId: number){
        await ProjectRepository.deleteProject(projectId)
    },

    async getRoleUser(projectId: number, userId: number){
        return await ProjectRepository.getRoleUser(projectId, userId)
    },

    async changePriority(data: UpdatePriorityProjectDTO, userId: number){
        await UserProjectRepository.changePriority(data, userId)
    }
}