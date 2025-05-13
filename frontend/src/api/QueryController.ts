import axios, { GenericAbortSignal } from "axios"
import core from "../core/core"
import { AuthorizationProp, RegisrationProp } from "../entities/schemas/dto/authorizationDTO"
import authInstance from "./authinstance"
import { UserDataDTO } from "../entities/schemas/dto/userDTO"
import { ProjectBaseDTO, ProjectDTORelation } from "../entities/schemas/dto/projectDTO"
import { Role } from "../entities/schemas/enums/project"
import { ProjectListAdapted } from "../entities/schemas/adaptedSchemas/project"

class ApiQueryClass{
    authorization = {
        async enter(data: AuthorizationProp){
            await axios.post(core.serverEndnpoints.auth.enterAuth, data, {withCredentials: true})
            .then(({data}) => localStorage.setItem(core.localStorageKeys.access_token, data.accessToken))
        },
    
        async register(data: RegisrationProp){
            await axios.post(core.serverEndnpoints.auth.regAuth, data, {withCredentials: true})
            .then(({data}) => localStorage.setItem(core.localStorageKeys.access_token, data.accessToken))
        },
    
        async updateAccessToken() : Promise<string>{
            return (await axios.get(core.serverEndnpoints.auth.updateRefresh)).data.accessToken
        },
    }
    user = {
        async getUser(){
            const data =  (await authInstance.get<UserDataDTO>(core.serverEndnpoints.user.get)).data
            return data
        },
        async findUsers(login: string, signal?: GenericAbortSignal | undefined){
            const data = (await authInstance.get<UserDataDTO[] | undefined>
                (core.serverEndnpoints.user.find, {params: {login}, signal: signal})).data ?? []
            console.log("finded", data)
            return data
        }
    }
    project = {
        async getProjects(){
            const data = (await authInstance.get<ProjectDTORelation[]>(core.serverEndnpoints.project.get)).data
            console.log("getetd ptoj api", data)
            return data
        },
        async deleteProject(id: number){
            await authInstance.delete(core.serverEndnpoints.project.delete, {params: {idProject: id}})
        },
        async addProject(project: ProjectBaseDTO, ownerId: number){
            const idNewProject = await authInstance.post(
                core.serverEndnpoints.project.add, {...project, users: [{id: ownerId, role: Role.admin}]}
            ).then(({data}) => data.idProject)
            return idNewProject
        },
        async updateProject(project: ProjectBaseDTO){
            await authInstance.patch(core.serverEndnpoints.project.update, project)
        },
        async updateUsers(project: ProjectListAdapted){
            await authInstance.patch(core.serverEndnpoints.project.updateUsersInProject, project)
        },
        async leave(projectId: number){
            await authInstance.delete(core.serverEndnpoints.project.leave, {params: {projectId}})
        },
        async getSelectedProject(projectId: number){
            const project = (await authInstance.get(core.serverEndnpoints.project.getSelectedProject)).data
            return project
        }
    }
}

const ApiQuery = new ApiQueryClass()
export default ApiQuery