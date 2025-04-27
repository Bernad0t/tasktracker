import { UserRepository } from "../db/repositories/user.rep";
import { UserDataDTO } from "../schemas/dto/userDTO";

class UserServiceClass{
    async getData(id: number){
        const data: UserDataDTO = await UserRepository.getData(id)
        return data
    }

    async getUserByLogin(login: string){
        const data: UserDataDTO[] | undefined = await UserRepository.findUserQueryOR({login: login})
        return data
    }
}

const UserService = new UserServiceClass()
export default UserService