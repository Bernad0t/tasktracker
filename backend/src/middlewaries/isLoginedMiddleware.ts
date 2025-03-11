import { NextFunction, Request, Response } from "express";
import { KeysCookie } from "../schemas/enums/configEnum";
import checkValidToken from "./utils/checkValidToken";

const isLoginedMiddleware = function (req: Request, res: Response, next: NextFunction) {
    const token = req.cookies[KeysCookie.access_token]
    if (token){
        if (checkValidToken(token))
            next()
        else throw new Error('Invalid cookies')
    } else throw new Error('Invalid cookies')
}  