import { EntityManager, FindOptionsWhere, Repository } from "typeorm";
import db from "../db";
import { ProjectORM, UserORM, UserProjectORM } from "../orm/userOrm";
import { Role } from "../../schemas/enums/userEnum";
import { UserRoleInProjectDTO } from "../../schemas/dto/projectDTO";

export const UserRepository = db.getRepository(UserORM).extend({
    async findUserQueryOR<T extends Object>(userData: T){
        const condition = Object.keys(userData).map(key => {return {[key]: userData[key as keyof typeof userData]}}) // могут быть undef поля
        const user = await this.find({
            where: condition.filter(cond => cond != undefined) as FindOptionsWhere<UserORM>[]
        })
        return user[0]
    },

    async addProject(project: ProjectORM, userInProject: UserRoleInProjectDTO, manager?: EntityManager){
        const userProjectRep = db.getRepository(UserProjectORM)
        const user = await this.findUserQueryOR({id: userInProject.id});
        const headProject = await userProjectRep.findOne({
            where: {
                user: {id: userInProject.id},
                project: {id: project.id},
                parent: undefined
            }
        }) 

        if (!user || !project) {
            throw new Error('User or Project not found');
        }

        const userProject = new UserProjectORM();
        userProject.user = user;
        userProject.project = project;
        userProject.role = userInProject.role;
        userProject.child = headProject
        userProject.parent = null
        // userProject.priority = 0; // Или любое другое значение по умолчанию

        // Сохраняем в базе данных
        if (manager){
            const project = manager.create(UserProjectORM, userProject);
            await manager.save(UserProjectORM, project);
        }
        else{
            await userProjectRep.save(userProject);
        }
    }
})