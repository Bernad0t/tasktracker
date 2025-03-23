import express, { Request, Response } from 'express';

const projectRouter = express.Router()

projectRouter.get("/get-project", (req: Request, res: Response)=> {
    console.log("happy")
    res.status(200).json("getted")
})

export default projectRouter