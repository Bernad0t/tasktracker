import express, { Request, Response } from 'express';
import { CreateProjectDTO } from '../schemas/dto/projectDTO';
import { ProjectService } from '../app/projectService';

const projectRouter = express.Router()

class ProjectController{
    constructor() {
        projectRouter.post("/add-project", this.addProject);
        projectRouter.get("/get-project-by-name", this.getFilteredProject);
    }
    
    async addProject(req: Request, res: Response){
        const project: CreateProjectDTO = req.body
        try{
            await ProjectService.addProject(project)
            res.status(200).json(`added projects to ${JSON.stringify(project)}`)
        } catch (error){
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getFilteredProject(req: Request, res: Response){
        const userId = req.tokenPayload.id
        const projectFilter = req.query.name as string ?? "" 
        try {
            const projects = await ProjectService.getFilteredProject(userId, projectFilter);
            res.status(200).json(projects);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

new ProjectController()

projectRouter.get("/get-project", (req: Request, res: Response)=> {
    console.log("happy")
    res.status(200).json("getted")
})

export default projectRouter