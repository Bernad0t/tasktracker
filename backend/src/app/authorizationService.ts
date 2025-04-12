import sessionConf from "../config/sessionConf";
import { AuthRepository } from "../db/repositories/auth.rep";
import { UserRepository } from "../db/repositories/user.rep";
import { FindUserError } from "../exceptions/userExceptions";
import { UserCreateDTO, UserLoginDTO } from "../schemas/dto/userDTO";
import { comparePasswords, hashPassword } from "./utils/passwordUtils";
import jwt, { JwtPayload } from "jsonwebtoken";


export const AuthorizationService = {
    async login(data: UserLoginDTO){
        let dataSearching = {
            login: data.loginField,
            email: data.loginField
        }
        const user = await UserRepository.findUserQueryOR(dataSearching) // хоть поиск ИЛИ, тем не менее регистрируются пользователи с уникальными обоими полями
        if (!user || !(await comparePasswords(data.password, user.password)))
            throw new FindUserError("Неверный логин или пароль")
        return user.id
    },

    async registration(data: UserCreateDTO){
        let dataSearching = {
            login: data.login,
            email: data.email
        }
        const user = await UserRepository.findUserQueryOR(dataSearching)
        if (user)
            throw new FindUserError("Неверный логин или пароль")
        const hashedData = {...data, password: (await hashPassword(data.password))}
        const savedUserId = await AuthRepository.authorizationQuery(hashedData)
        return savedUserId
    },

    refreshToken(refreshToken: string){
        const id = (jwt.verify(refreshToken, sessionConf.SECRET_KEY_TOKEN) as JwtPayload).id
        const accessToken = jwt.sign({ id: id }, sessionConf.SECRET_KEY_TOKEN, { expiresIn: sessionConf.EXPIRE_ACCESS_TOKEN});
        return accessToken
    }

}