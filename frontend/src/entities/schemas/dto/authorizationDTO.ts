// если меняешь, е забудь в validator внести изменения

export interface AuthorizationProp {
    login: string;
    password: string;
}

export const initialAuthorizationProp: AuthorizationProp = {
    login: '',
    password: '',
};

export interface RegisrationProp extends AuthorizationProp {
    // mail в лич каб
    username: string;
    email: string;
    repeatPassword: string; // важно иметь подстрроку password для type input
}

export const initialRegisrationProp: RegisrationProp = {
    username: '',
    login: '',
    email: '',
    password: '',
    repeatPassword: '',
};
