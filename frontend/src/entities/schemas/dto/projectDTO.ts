import { Role } from "../enums/project"
import { TaskDTORelation } from "./taskDTO"
import { UserDataRolesDTO } from "./userDTO"

export interface ProjectBaseDTO{ // type не нужен, нет смысла ограничивать
    name: string
    description?: string
}

export interface ProjectDTO extends ProjectBaseDTO{
    id: number
    parent?: ProjectDTO
    child?: ProjectDTO
}

export interface UserRoleInProjectDTO{
    id: number,
    role: Role
}

export interface CreateProjectDTO extends ProjectBaseDTO{
    users: UserRoleInProjectDTO[] // информация про создателя, если direct, иначе много пользователей. id будет как короткое имя для поиска
}

export interface ProjectDTOUserRoles extends CreateProjectDTO{
    id: number
}

export interface ProjectDTORelation extends ProjectDTO{
    users?: UserDataRolesDTO[]
    tasks?: TaskDTORelation[]
}

export interface UpdatePriorityProjectDTO{
    project: ProjectDTO
    replacedId: number
}