import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { AuthorizationService } from '../app/authorizationService'
import { FindUserError } from '../exceptions/userExceptions'
import jwt from 'jsonwebtoken';
import SessionConfig from '../config/sessionConf';

const router = express.Router() //  остается токен 

function processAuthError(res: Response, err: unknown){
    if (err instanceof FindUserError) {
        // Если ошибка является FindUserError, отправляем 401 ошибку
        res.status(401).json({ message: err.message });
    } else {
        // Для других ошибок отправляем 500 ошибку
        console.log(err)
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Декоратор для обработки ошибок
function authorizationDecorator() {
    return function(target: any, propertyName: string, descriptor: PropertyDescriptor){
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            try {
                await originalMethod.apply(this, [req, res, next]);
                const id = req.body.userId
                const refreshToken = jwt.sign({ id: id }, SessionConfig.SECRET_KEY_TOKEN, { expiresIn: SessionConfig.EXPIRE_REFRESH_TOKEN}); 
                res.cookie('refreshToken', refreshToken, { signed: false, maxAge: SessionConfig.EXPIRE_COOKIE, httpOnly: true });
                const accessToken = jwt.sign({ id: id }, SessionConfig.SECRET_KEY_TOKEN, { expiresIn: SessionConfig.EXPIRE_ACCESS_TOKEN});
                res.status(200).json({ accessToken });
            } catch (err) {
                processAuthError(res, err);
            }
        };
    }
}

class AuthController {
    constructor() {
        router.post("/sign-in", this.signIn);
        router.post("/sign-up", this.signUp);
    }

    @authorizationDecorator()
    async signIn(req: Request, res: Response) {
        const id = await AuthorizationService.login(req.body);
        req.body = {userId: id}
    }

    @authorizationDecorator()
    async signUp(req: Request, res: Response) {
        const id = await AuthorizationService.registration(req.body);
        req.body = {userId: id}    
    }
}

// Создаем экземпляр контроллера, чтобы зарегистрировать маршруты
new AuthController();

export { router }