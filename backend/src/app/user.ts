import { UserRepository } from "../db/repositories/user.rep";
import { UserDataDTO } from "../schemas/dto/userDTO";

class UserSrviceClass{
    async getData(id: number){
        const data: UserDataDTO = await UserRepository.getData(id)
        return data
    }
}

const UserSrvice = new UserSrviceClass()
export default UserSrvice