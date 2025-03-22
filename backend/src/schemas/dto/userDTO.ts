export interface UserDataDTO{
    email: string,
    username: string
}

export interface UserLoginDTO{
    loginField: string // может быть почта или логин
    password: string
}

export interface UserCreateDTO extends UserDataDTO{
    login: string
    password: string
}