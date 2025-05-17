import { StatusTask } from "../enums/project"
import { CommentsDTO } from "./commentsDTO"

export interface TaskDTO{
    name: string
    description?: string
    status?: StatusTask
    deadline?: string
    reviewer?: number
    assigned: number
    project: number
}

export const initialTaskDTO: TaskDTO = {
    name: "",
    description: undefined,
    status: StatusTask.assigned,
    deadline: undefined,
    reviewer: undefined,
    assigned: -1,
    project: -1
}

export interface TaskDTORelation extends TaskDTO{
    id: number
    comments?: CommentsDTO[]
}