import { AuthRepository } from "../db/repositories/auth.rep";
import { UserRepository } from "../db/repositories/user.rep";
import { FindUserError } from "../exceptions/customExceptions/userExceptions";
import { UserCreateDTO, UserLoginDTO } from "../schemas/dto/userDTO";
import { comparePasswords, hashPassword } from "./utils/passwordUtils";

export const AuthorizationService = {
    async login(data: UserLoginDTO){
        let dataSearching = {
            login: data.loginField,
            email: data.loginField
        }
        const user = await UserRepository.findUserQueryOR<Object>(dataSearching) // хоть поиск ИЛИ, тем не менее регистрируются пользователи с уникальными обоими полями
        if (!user)
            throw new FindUserError("Такого пользователя не существует")
        if (!(await comparePasswords(data.password, user.password)))
            throw new FindUserError("Неверный пароль")
    },

    async registration(data: UserCreateDTO){
        let dataSearching = {
            login: data.login,
            email: data.email
        }
        const user = await UserRepository.findUserQueryOR(dataSearching)
        if (user)
            throw new FindUserError("Такой пользователь уже существует")
        const hashedData = {...data, password: (await hashPassword(data.password))}
        await AuthRepository.authorizationQuery(hashedData)
    }

}