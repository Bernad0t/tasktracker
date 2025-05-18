import { Role } from '../enums/project';
import { ProjectDTO } from './projectDTO';

export interface UserDataDTO {
    id: number;
    email: string;
    username: string;
}

export interface UserDataRolesDTO extends UserDataDTO {
    role: Role;
}

export interface UserLoginDTO {
    loginField: string; // может быть почта или логин
    password: string;
}

export interface UserCreateDTO extends UserDataDTO {
    login: string;
    password: string;
}

export interface UserDTORelation extends UserDataDTO {
    projects: ProjectDTO[];
}

export const userDataInitial: UserDataDTO = {
    id: 0,
    email: 'email@example.com',
    username: 'username',
};
