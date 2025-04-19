import axios from "axios"
import core from "../core/core"
import { AuthorizationProp, RegisrationProp } from "../entities/schemas/dto/authorizationDTO"
import authInstance from "./authinstance"
import { UserDataDTO } from "../entities/schemas/dto/userDTO"
import { ProjectDTO } from "../entities/schemas/dto/projectDTO"

class ApiQueryClass{
    // private static generateUrlServer(url: string){
    //     return core.apiBaseUrl + url
    // }
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
        }
    }
    project = {
        async getProjects(){
            return authInstance.get<ProjectDTO[]>(core.serverEdnpoints.project.get)
            .then(({data}) => data)
        },
        async deleteProject(id: number){
            await authInstance.delete(core.serverEdnpoints.project.delete, {params: {idProject: id}})
        }
    }
}

const ApiQuery = new ApiQueryClass()
export default ApiQuery