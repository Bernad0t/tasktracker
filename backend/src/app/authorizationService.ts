import { UserCreateDTO, UserLoginDTO } from "../schemas/dto/userDTO";
import { hashPassword } from "./utils/passwordUtils";

export const AuthorizationService = {
    async login(data: UserLoginDTO){

    },

    async registration(data: UserCreateDTO){
        const hashedData = {...data, password: (await hashPassword(data.password))}
        
    }

}