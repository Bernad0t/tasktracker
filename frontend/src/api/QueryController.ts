import axios, { GenericAbortSignal } from "axios"
import core from "../core/core"
import { AuthorizationProp, RegisrationProp } from "../entities/schemas/dto/authorizationDTO"
import authInstance from "./authinstance"
import { UserDataDTO } from "../entities/schemas/dto/userDTO"
import { ProjectBaseDTO, ProjectDTORelation } from "../entities/schemas/dto/projectDTO"
import { Role } from "../entities/schemas/enums/project"

class ApiQueryClass{
    authorization = {
        async enter(data: AuthorizationProp){
            await axios.post(core.serverEdnpoints.auth.enterAuth, data, {withCredentials: true})
            .then(({data}) => localStorage.setItem(core.localStorageKeys.access_token, data.accessToken))
        },
    
        async register(data: RegisrationProp){
            await axios.post(core.serverEdnpoints.auth.regAuth, data, {withCredentials: true})
            .then(({data}) => localStorage.setItem(core.localStorageKeys.access_token, data.accessToken))
        },
    
        async updateAccessToken() : Promise<string>{
            return axios.get(core.serverEdnpoints.auth.updateRefresh)
            .then(({data}) => data.accessToken)
        },
    }
    user = {
        async getUser(){
            return authInstance.get<UserDataDTO>(core.serverEdnpoints.user.get)
            .then(({data}) => data)
        },
        async findUsers(login: string, signal?: GenericAbortSignal | undefined){
            return authInstance.get<UserDataDTO[] | undefined>(core.serverEdnpoints.user.find, {params: {login}, signal: signal})
            .then(({data}) => data)
        }
    }
    project = {
        async getProjects(){
            return authInstance.get<ProjectDTORelation[]>(core.serverEdnpoints.project.get)
            .then(({data}) => data)
        },
        async deleteProject(id: number){
            await authInstance.delete(core.serverEdnpoints.project.delete, {params: {idProject: id}})
        },
        async addProject(project: ProjectBaseDTO, ownerId: number){
            const idNewProject = await authInstance.post(
                core.serverEdnpoints.project.add, {...project, users: [{id: ownerId, role: Role.admin}]}
            ).then(({data}) => data.idProject)
            return idNewProject
        },
        async updateProject(project: ProjectBaseDTO){
            await authInstance.patch(core.serverEdnpoints.project.update, project)
        }
    }
}

const ApiQuery = new ApiQueryClass()
export default ApiQuery