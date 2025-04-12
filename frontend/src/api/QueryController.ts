import axios from "axios"
import core from "../core/core"
import { AuthorizationProp, RegisrationProp } from "../entities/schemas/dto/authorizationDTO"
import authInstance from "./authinstance"
import { UserDataDTO } from "../entities/schemas/dto/userDTO"

class ApiQueryClass{
    // private static generateUrlServer(url: string){
    //     return core.apiBaseUrl + url
    // }

    async enter(data: AuthorizationProp){
        await axios.post(core.serverEdnpoints.auth.enterAuth, data, {withCredentials: true})
        .then(({data}) => localStorage.setItem(core.localStorageKeys.access_token, data.accessToken))
    }

    async register(data: RegisrationProp){
        await axios.post(core.serverEdnpoints.auth.regAuth, data, {withCredentials: true})
        .then(({data}) => localStorage.setItem(core.localStorageKeys.access_token, data.accessToken))
    }

    async updateAccessToken() : Promise<string>{
        return axios.get(core.serverEdnpoints.auth.updateRefresh)
        .then(({data}) => data.accessToken)
    }

    async getUser(){
        return authInstance.get<UserDataDTO>(core.serverEdnpoints.user.get)
        .then(({data}) => data)
    }
}

const ApiQuery = new ApiQueryClass()
export default ApiQuery