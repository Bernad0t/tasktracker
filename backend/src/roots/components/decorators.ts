import { NextFunction } from "express";
import { type Request, type Response } from "express";
import { ProjectService } from "../../app/projectService";
import { Role } from "../../schemas/enums/userEnum";

export function handlerError(){
    return function(target: any, propertyName: string, descriptor: PropertyDescriptor){
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            try {
                await originalMethod.apply(this, [req, res, next]);
            } catch (error){
                console.error(error);
                res.status((error as any).status ?? 500).json({ message: (error as any).message ?? 'Internal Server Error' });
            }
        };
    }
}

export function roleValidateAccess(){
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