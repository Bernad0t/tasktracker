import { Role, TypeProject } from "../enums/userEnum"

export interface ProjectBaseDTO{
    name: string
    description?: string
    type: TypeProject
}

export interface UserRoleInProjectDTO{
    id: number,
    role: Role
}

export interface CreateProjectDTO extends ProjectBaseDTO{
    users: UserRoleInProjectDTO[] // информация про создателя, если direct, иначе много пользователей. id будет как короткое имя для поиска
}