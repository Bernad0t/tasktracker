import express, {Request, Response} from 'express'
import { AuthorizationService } from '../app/authorizationService'
import { FindUserError } from '../exceptions/customExceptions/userExceptions'

export const router = express.Router() //  остается токен 

function processAuthError(res: Response, err: unknown){
    if (err instanceof FindUserError) {
        // Если ошибка является FindUserError, отправляем 401 ошибку
        res.status(401).json({ message: err.message });
    } else {
        // Для других ошибок отправляем 500 ошибку
        console.log((err as any).message)
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

router.post("/sign-in", async (req: Request, res: Response) => {
    try{
        await AuthorizationService.login(req.body)
        console.log("success")
        res.status(200).json({ message: "Login successful" })
    }
    catch (err){
        processAuthError(res, err)
    }
})

router.post("/sign-up", async (req: Request, res: Response) => {
    try{
        await AuthorizationService.registration(req.body)
        console.log("success")
        res.status(200).json({ message: "Reg successful" })
    }
    catch (err){
        processAuthError(res, err)
    }
})