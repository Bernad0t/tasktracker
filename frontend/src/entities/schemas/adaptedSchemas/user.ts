import { UserDataDTO } from "../dto/userDTO"

export interface IAddUser extends UserDataDTO{
    callback: (id: number) => void
}