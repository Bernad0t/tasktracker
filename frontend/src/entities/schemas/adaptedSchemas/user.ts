import { UserDataDTO } from "../dto/userDTO"

export interface IAddUser extends UserDataDTO{
    callback?: (user: UserDataDTO) => void
}