import { StatusTask } from "../enums/userEnum"
import { CommentsDTO } from "./commentsDTO"

export interface TaskDTO{
    name: string
    description?: string
    status?: StatusTask
    deadline?: Date
    reviewer?: number
    assigned: number
    project: number
}

export interface TaskDTORelation extends TaskDTO{
    id: number
    comments?: CommentsDTO[]
}