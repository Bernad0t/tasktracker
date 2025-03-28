import { Role } from "../enums/userEnum"

export interface ProjectBaseDTO{ // type не нужен, нет смысла ограничивать
    name: string
    description?: string
}

export interface ProjectDTO extends ProjectBaseDTO{
    id: number
}

export interface UserRoleInProjectDTO{
    id: number,
    role: Role
}

export interface CreateProjectDTO extends ProjectBaseDTO{
    users: UserRoleInProjectDTO[] // информация про создателя, если direct, иначе много пользователей. id будет как короткое имя для поиска
}

export interface ProjectDTORelation extends CreateProjectDTO, ProjectDTO{}

export interface UpdatePriorityProjectDTO{
    project: ProjectDTO
    replacedId: number
}