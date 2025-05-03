import { UserDataDTO } from "../dto/userDTO"

export interface IAddUser{
    user: UserDataDTO
    callback?: (user: UserDataDTO) => void
}