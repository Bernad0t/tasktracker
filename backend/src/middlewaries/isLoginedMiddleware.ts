import { NextFunction, Request, Response } from "express";
import decodeToken from "./utils/checkValidToken";

const isLoginedMiddleware = function (req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1] // Bearer TOKEN
    if (token){
        const decodedToken = decodeToken(token)
        if (decodedToken){
            console.log("decoded token", decodedToken)
            req.tokenPayload = decodedToken
            next()
        }
    }
    res.status(401).json("unauthorization")
}

export default isLoginedMiddleware