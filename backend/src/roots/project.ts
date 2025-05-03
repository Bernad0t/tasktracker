import express, { NextFunction, type Request, type Response } from 'express';
import { CreateProjectDTO, ProjectDTO, ProjectDTORelation, ProjectDTOUserRoles, UpdatePriorityProjectDTO, UserRoleInProjectDTO } from '../schemas/dto/projectDTO';
import { ProjectService } from '../app/projectService';
import { Role } from '../schemas/enums/userEnum';
import { handlerError, roleValidateAccess } from './components/decorators';
import { ProjectORM } from '../db/orm/userOrm';

const projectRouter = express.Router()

class ProjectController{
    constructor() {
        projectRouter.post("/add-project", this.addProject.bind(this));
        projectRouter.get("/get-project-by-name", this.getFilteredProject.bind(this));
        projectRouter.post("/add-user-to-project", this.addUserIntoProject.bind(this));
        projectRouter.patch('/update-project', this.updateProject.bind(this))
        projectRouter.delete('/delete-project', this.deleteProject.bind(this))
        projectRouter.patch('/change-priority', this.changePriority.bind(this))
        projectRouter.get('/get-projects', this.getProjects.bind(this))
        projectRouter.get('/get-info-project', this.getInfoProject.bind(this))
        projectRouter.patch('/update-users', this.updateUserComposition.bind(this))
        projectRouter.delete('/leave', this.leave.bind(this))
    }
    
    @handlerError()
    async addProject(req: Request, res: Response){
        const project: CreateProjectDTO = req.body
        const idProject = await ProjectService.createProject(project)
        res.status(200).json({idProject: idProject})
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
        const projects: ProjectDTORelation[] = await ProjectService.getProjects(userId)
        res.status(200).json(projects)
    }

    @handlerError()
    async getInfoProject(req: Request, res: Response){
        const projectId = Number(req.query.projectId)
        const project: ProjectDTORelation = await ProjectService.getProjectInfo(projectId)
        res.status(200).json(project)
    }

    @handlerError()
    @roleValidateAccess()
    async updateUserComposition(req: Request, res: Response){
        const project: ProjectDTORelation = req.body
        await ProjectService.changeUserComposition(project)
        res.status(200).json("successfull")
    }

    @handlerError()
    async leave(req: Request, res: Response){
        const projectId = Number(req.query.projectId)
        const userId = req.tokenPayload.id
        await ProjectService.leave(projectId, userId)
        res.status(200).json("leave success")
    }
}

new ProjectController()

export default projectRouter