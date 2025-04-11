import { UserRepository } from "../db/repositories/user.rep";
import { UserDataDTO } from "../schemas/dto/userDTO";

class UserServiceClass{
    async getData(id: number){
        const data: UserDataDTO = await UserRepository.getData(id)
        return data
    }
}

const UserService = new UserServiceClass()
export default UserService