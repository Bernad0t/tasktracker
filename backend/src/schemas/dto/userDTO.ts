import { Role } from "../enums/userEnum"
import { type ProjectDTO } from "./projectDTO"

export interface UserDataDTO{
    id: number
    email: string,
    username: string
}

export interface UserDataRolesDTO extends UserDataDTO{
    role: Role
}

export interface UserLoginDTO{
    login: string // может быть почта или логин
    password: string
}

export interface UserCreateDTO extends UserDataDTO{
    login: string
    password: string
}

export interface UserDTORelation extends UserDataDTO{
    projects: ProjectDTO[]
}