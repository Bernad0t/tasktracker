import { ProjectDTO } from "../dto/projectDTO";

export interface ProjectListAdapted extends ProjectDTO{
    active: boolean
}