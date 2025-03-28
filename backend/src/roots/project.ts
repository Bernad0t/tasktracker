import express, { NextFunction, type Request, type Response } from 'express';
import { CreateProjectDTO, ProjectDTO, UpdatePriorityProjectDTO, UserRoleInProjectDTO } from '../schemas/dto/projectDTO';
import { ProjectService } from '../app/projectService';
import { Role } from '../schemas/enums/userEnum';

const projectRouter = express.Router()

function handlerError(){
    return function(target: any, propertyName: string, descriptor: PropertyDescriptor){
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            try {
                await originalMethod.apply(this, [req, res, next]);
            } catch (error){
                console.error(error);
                res.status(500).json({ message: (error as any).message ?? 'Internal Server Error' });
            }
        };
    }
}

function validateAccess(){
    return function(target: any, propertyName: string, descriptor: PropertyDescriptor){
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            const userId = req.tokenPayload.id
            const projectId = req.body.idProject
            const role = await ProjectService.getRoleUser(projectId, userId)
            if (role != Role.admin){
                res.status(409).json("Недостаточно прав")
                return
            }
            await originalMethod.apply(this, [req, res, next]);
        };
    }
}

class ProjectController{
    constructor() {
        projectRouter.post("/add-project", this.addProject);
        projectRouter.get("/get-project-by-name", this.getFilteredProject);
        projectRouter.post("/add-user-to-project", this.addUserIntoProject);
        projectRouter.patch('/update-project', this.updateProject)
        projectRouter.delete('/delete-project', this.deleteProject)
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
        const projects = await ProjectService.getFilteredProject(userId, projectFilter);
        res.status(200).json(projects);
    }

    @handlerError()
    @validateAccess()
    async addUserIntoProject(req: Request, res: Response){ // user в body, idProject в query
        const user: UserRoleInProjectDTO = req.body
        const idProject: number = Number(req.query.idProject)
        await ProjectService.addUserIntoProject(user, idProject)
        res.status(200).json("successfull")
    }

    @handlerError()
    @validateAccess()
    async updateProject(req: Request, res: Response){  
        const project: ProjectDTO = req.body
        await ProjectService.updateProject(project)
        res.status(200).json("successfull")
    }

    @handlerError()
    @validateAccess()
    async deleteProject(req: Request, res: Response){
        const idProject: number = Number(req.query.idProject)
        await ProjectService.deleteProject(idProject)
        res.status(200).json("successfull")
    }

    @handlerError()
    async changePriority(req: Request, res: Response){
        const project: UpdatePriorityProjectDTO = req.body
        const userId = req.tokenPayload.id
        
    }

    // get project вместе с тсками, таски вместе с комментариями, так что отложу пока их не сделаю
}

new ProjectController()

projectRouter.get("/get-project", (req: Request, res: Response)=> {
    console.log("happy")
    res.status(200).json("getted")
})

export default projectRouter