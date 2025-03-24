import db from "../db/db";
import { ProjectORM } from "../db/orm/userOrm";
import { ProjectRepository } from "../db/repositories/project.rep";
import { UserRepository } from "../db/repositories/user.rep";
import { CreateProjectDTO } from "../schemas/dto/projectDTO";

export const ProjectService = {
    async addProject(project: CreateProjectDTO){
        const queryRunner = db.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction();
        try{
            const projectOrm: ProjectORM = await ProjectRepository.addProject(project, queryRunner.manager)
            for (let user of project.users){
                await UserRepository.addProject(projectOrm, user, queryRunner.manager) // поч обязательно await мне писать ?
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
    }
}