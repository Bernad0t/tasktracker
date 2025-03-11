export interface UserDataDTO{
    email: string,
    username: string
}

interface UserCreateBase{
    password: string
}

export interface UserLoginDTO extends UserCreateBase{
    loginField: string // может быть почта или логин
}

export interface UserCreateDTO extends UserCreateBase, UserDataDTO{
    login: string
}