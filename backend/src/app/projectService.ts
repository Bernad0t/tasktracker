import db from "../db/db";
import { ProjectORM, UserProjectORM } from "../db/orm/userOrm";
import { ProjectRepository } from "../db/repositories/project.rep";
import { TaskRepostiry } from "../db/repositories/task.rep";
import { UserRepository } from "../db/repositories/user.rep";
import { UserProjectRepository } from "../db/repositories/userProject.rep";
import { CreateProjectDTO, ProjectDTORelation, ProjectDTOUserRoles, UpdatePriorityProjectDTO, UserRoleInProjectDTO } from "../schemas/dto/projectDTO";
import createProjectOrder from "./utils/createProjectOrder";

export const ProjectService = {
    async createProject(project: CreateProjectDTO){
        if (!project.users)
            throw new Error("Проект без пользователей не может существовать")
        const queryRunner = db.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction();
        try{
            const projectOrm: ProjectORM = await ProjectRepository.createProject(project, queryRunner.manager)
            for (let user of project.users){
                await UserRepository.addProject({...projectOrm}, user, queryRunner.manager)
            }
            await queryRunner.commitTransaction();
            return projectOrm.id
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

    async updateProject(project: ProjectDTOUserRoles){
        await ProjectRepository.updateProject(project)
        if (project.users)
            for (const user of project.users){
                await UserProjectRepository.updateRole(project.id, user.id, user.role)
            }
    },

    async ChangeUserComposition(project: ProjectDTORelation){
        const currentUsers = await ProjectRepository.getUsersInProject(project.id)
        const arrPromises = []
        for (const newUser of project.users ?? []){
            const oldFindedUserIn = currentUsers.find(us => us.id === newUser.id)
            if (!oldFindedUserIn){
                arrPromises.push(new Promise(async () => {
                    const userOrm = await UserRepository.findUserQueryOR({id: newUser.id})
                    if (userOrm){
                        const projectOrm = await ProjectRepository.getProjectById(project.id) 
                        await UserProjectRepository.addUserInProject(projectOrm, userOrm[0], newUser.role)
                    }
                }))
            }
            else if (newUser.role !== oldFindedUserIn.role){
                arrPromises.push(new Promise(async () => {
                    await UserProjectRepository.updateUserInProject(project.id, newUser.id, newUser.role)
                }))
            }
        }
        const deletingProjectUsers = currentUsers.filter(us => !project.users?.find(newUs => newUs.id === us.id))
        for (const delUser of deletingProjectUsers){
            arrPromises.push(new Promise(async () => {
                await UserProjectRepository.delete({project: {id: project.id}, user: {id: delUser.id}})
            }))
        }
        await Promise.all(arrPromises)
    },

    async deleteProject(projectId: number){
        await ProjectRepository.deleteProject(projectId)
    },

    async getRoleUser(projectId: number, userId: number){
        return await ProjectRepository.getRoleUser(projectId, userId)
    },

    async changePriority(data: UpdatePriorityProjectDTO, userId: number){
        await UserProjectRepository.changePriority(data, userId)
    },

    async getProjects(userId: number): Promise<ProjectDTORelation[]>{
        const userprojects = await UserProjectRepository.getProjects(userId)
        const ordered = createProjectOrder<UserProjectORM>(userprojects)
        const projects: ProjectDTORelation[] = ordered.map(proj => {
            return {
                ...proj.project,
                parent: proj.parent?.project,
                child: proj.child?.project,
                tasks: [],
                users: ordered.filter(filtered => filtered.project.id === proj.project.id)
                .map((filtered => {return {
                    email: filtered.user.email,
                    id: filtered.user.id,
                    username: filtered.user.username,
                    role: filtered.role
                }}))
            }
        })
        return projects
    },

    async getProjectInfo(projectId: number): Promise<ProjectDTORelation>{
        const [project, tasks] = await Promise.all([
            ProjectRepository.getRelationProject(projectId),
            TaskRepostiry.getProjectTasks(projectId)
        ]);
        project.tasks = tasks
        return project
    }
}