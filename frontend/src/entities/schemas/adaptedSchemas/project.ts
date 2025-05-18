import { ProjectDTORelation } from '../dto/projectDTO';
import { Role } from '../enums/project';

export interface ProjectListAdapted extends ProjectDTORelation {
    active: boolean;
    role: Role;
}

export const initialProjectListAdapted: ProjectListAdapted = {
    active: false,
    role: Role.user,
    id: 0,
    name: '',
    description: '',
};
