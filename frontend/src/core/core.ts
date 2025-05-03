const apiBaseUrl = "http://localhost:8000"

class ServerEndpoints{
    auth = {
        enterAuth: `${apiBaseUrl}/authorization/sign-in`,
        regAuth: `${apiBaseUrl}/authorization/sign-up`,
        updateRefresh: `${apiBaseUrl}/authorization/refresh`
    }
    user = {
        get: `${apiBaseUrl}/protected/user/get-data`,
        find: `${apiBaseUrl}/protected/user/get-user-by-login`
    }
    project = {
        get: `${apiBaseUrl}/protected/project/get-projects`,
        delete: `${apiBaseUrl}/protected/project/delete-project`,
        add: `${apiBaseUrl}/protected/project/add-project`,
        update: `${apiBaseUrl}/protected/project/update-project`,
        updateUsersInProject: `${apiBaseUrl}/protected/project/update-users`,
        leave: `${apiBaseUrl}/protected/project/leave`
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
        this.serverEndnpoints = new ServerEndpoints()
        this.frontendEndpoints = new FrontendEndpoints()
        this.localStorageKeys = LocalStorageKeys
    }
    apiBaseUrl = apiBaseUrl
    serverEndnpoints
    frontendEndpoints
    localStorageKeys
}

const core = new Core()
export default core