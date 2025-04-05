import express, { NextFunction, type Request, type Response } from 'express';
import { CreateProjectDTO, ProjectDTO, ProjectDTORelation, ProjectDTOUserRoles, UpdatePriorityProjectDTO, UserRoleInProjectDTO } from '../schemas/dto/projectDTO';
import { ProjectService } from '../app/projectService';
import { Role } from '../schemas/enums/userEnum';
import { handlerError, roleValidateAccess } from './components/decorators';
import { ProjectORM } from '../db/orm/userOrm';

const projectRouter = express.Router()

class ProjectController{
    constructor() {
        projectRouter.post("/add-project", this.addProject);
        projectRouter.get("/get-project-by-name", this.getFilteredProject);
        projectRouter.post("/add-user-to-project", this.addUserIntoProject);
        projectRouter.patch('/update-project', this.updateProject)
        projectRouter.delete('/delete-project', this.deleteProject)
        projectRouter.patch('/change-priority', this.changePriority)
        projectRouter.get('/get-projects', this.getProjects)
        projectRouter.get('/get-info-project', this.getInfoProject)
    }
    
    @handlerError()
    async addProject(req: Request, res: Response){
        const project: CreateProjectDTO = req.body
        await ProjectService.addProject(project)
        res.status(200).json(`added projects to ${JSON.stringify(project)}`)
    }

    @handlerError()
    async getFilteredProject(req: Request, res: Response){
        const userId = req.tokenPayload.id
        const projectFilter = req.query.name as string ?? "" 
        const projects: ProjectORM[] = await ProjectService.getFilteredProject(userId, projectFilter);
        res.status(200).json(projects);
    }

    @handlerError()
    @roleValidateAccess()
    async addUserIntoProject(req: Request, res: Response){ // user в body, idProject в query
        const user: UserRoleInProjectDTO = req.body
        const idProject: number = Number(req.query.idProject)
        await ProjectService.addUserIntoProject(user, idProject)
        res.status(200).json("successfull")
    }

    @handlerError()
    @roleValidateAccess()
    async updateProject(req: Request, res: Response){  
        const project: ProjectDTOUserRoles = req.body
        await ProjectService.updateProject(project)
        res.status(200).json("successfull")
    }

    @handlerError()
    @roleValidateAccess()
    async deleteProject(req: Request, res: Response){
        const idProject: number = Number(req.query.idProject)
        await ProjectService.deleteProject(idProject)
        res.status(200).json("successfull")
    }

    @handlerError()
    async changePriority(req: Request, res: Response){
        const project: UpdatePriorityProjectDTO = req.body
        const userId = req.tokenPayload.id
        await ProjectService.changePriority(project, userId)
        res.status(200).json("successfull")
    }

    @handlerError()
    async getProjects(req: Request, res: Response){
        const userId = req.tokenPayload.id
        const projects: ProjectDTO[] = await ProjectService.getProjects(userId)
        res.status(200).json(projects)
    }

    @handlerError()
    async getInfoProject(req: Request, res: Response){
        const projectId = Number(req.query.projectId)
        const project: ProjectDTORelation = await ProjectService.getProjectInfo(projectId)
        res.status(200).json(project)
    }
}

new ProjectController()

export default projectRouter