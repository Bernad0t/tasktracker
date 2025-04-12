const apiBaseUrl = "http://localhost:8080"

class ServerEndpoints{
    auth = {
        enterAuth: `${apiBaseUrl}/authorization/sign-in`,
        regAuth: `${apiBaseUrl}/authorization/sign-up`,
        updateRefresh: `${apiBaseUrl}/authorization/refresh`
    }
    user = {
        get: `${apiBaseUrl}/protected/user/get-data`
    }
}

class FrontendEndpoints{
    login = "/login"
    register = "/register"
    home = "/"
}

enum LocalStorageKeys{
    access_token = "accessToken"
}

class Core{
    constructor(){
        this.serverEdnpoints = new ServerEndpoints()
        this.frontendEndpoints = new FrontendEndpoints()
        this.localStorageKeys = LocalStorageKeys
    }
    apiBaseUrl = apiBaseUrl
    serverEdnpoints
    frontendEndpoints
    localStorageKeys
}

const core = new Core()
export default core