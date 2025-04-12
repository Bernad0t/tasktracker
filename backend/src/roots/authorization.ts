import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { AuthorizationService } from '../app/authorizationService'
import { FindUserError } from '../exceptions/userExceptions'
import jwt from 'jsonwebtoken';
import SessionConfig from '../config/sessionConf';
import { handlerError } from './components/decorators';

const router = express.Router() //  остается токен 

function processAuthError(res: Response, err: unknown){
    console.error(err)
    res.status((err as any).status ?? 500).json({ message: (err as any).message ?? 'Internal Server Error' });
}

function authorizationDecorator() {
    return function(target: any, propertyName: string, descriptor: PropertyDescriptor){
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            try {
                await originalMethod.apply(this, [req, res, next]);
                const id = (this as any).userId
                if (!id)
                    throw new Error("id dont exist")

                const refreshToken = jwt.sign({ id: id }, SessionConfig.SECRET_KEY_TOKEN, { expiresIn: SessionConfig.EXPIRE_REFRESH_TOKEN}); 
                res.cookie('refreshToken', refreshToken, { 
                    signed: false, 
                    maxAge: SessionConfig.EXPIRE_COOKIE, 
                    httpOnly: true, 
                    secure: true, 
                    sameSite: 'strict'
                });
                const accessToken = jwt.sign({ id: id }, SessionConfig.SECRET_KEY_TOKEN, { expiresIn: SessionConfig.EXPIRE_ACCESS_TOKEN});
                res.status(200).json({accessToken: accessToken});
            } catch (err) {
                processAuthError(res, err);
            }
        };
    }
}

class AuthController {
    private userId?: number;

    constructor() {
        router.post("/sign-in", this.signIn.bind(this));
        router.post("/sign-up", this.signUp.bind(this));
        router.get("/refresh", this.refreshToken.bind(this))
    }

    @authorizationDecorator()
    async signIn(req: Request, res: Response) {
        this.userId = await AuthorizationService.login(req.body);
        // req.body = {userId: id}
    }

    @authorizationDecorator()
    async signUp(req: Request, res: Response) {
        this.userId = await AuthorizationService.registration(req.body);
        // req.body = {userId: id}    
    }

    @handlerError()
    async refreshToken(req: Request, res: Response){
        console.log(req.cookies, "req.cookies")
        const refreshToken = req.cookies?.refreshToken;

        // Проверяем, есть ли refreshToken
        if (!refreshToken) {
            res.status(401).json({ message: 'Refresh token not provided' });
            return
        }
        const accessToken = AuthorizationService.refreshToken(refreshToken)
        res.status(200).json(accessToken)
    }
}

new AuthController();

export { router }