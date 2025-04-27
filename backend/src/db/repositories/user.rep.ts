import { EntityManager, FindOptionsWhere, IsNull, Repository } from "typeorm";
import db from "../db";
import { ProjectORM, UserORM, UserProjectORM } from "../orm/userOrm";
import { UserRoleInProjectDTO } from "../../schemas/dto/projectDTO";
import { UserDTORelation } from "../../schemas/dto/userDTO";

export const UserRepository = db.getRepository(UserORM).extend({
    async findUserQueryOR<T extends Object>(userData: T){
        const condition = Object.keys(userData).map(key => {return {[key]: userData[key as keyof typeof userData]}}) // могут быть undef поля
        const users = await this.find({
            where: condition.filter(cond => cond != undefined) as FindOptionsWhere<UserORM>[]
        })
        return users.length === 0 ? undefined : users
    },

    async addProject(project: ProjectORM, userInProject: UserRoleInProjectDTO, manager?: EntityManager){
        const userProjectRep = manager?.getRepository(UserProjectORM) ?? db.getRepository(UserProjectORM)
        const user = await this.findUserQueryOR({id: userInProject.id});
        console.log("project", project, "userInProject", userInProject)
        const headProject = await userProjectRep.findOne({
            where: {
                user: {id: userInProject.id},
                parent: IsNull()
            }
        }) 

        if (!user || !project) {
            throw new Error('User or Project not found');
        }

        const userProject = new UserProjectORM();
        userProject.user = user[0];
        userProject.project = project;
        userProject.role = userInProject.role;
        userProject.child = headProject
        userProject.parent = null

        // Сохраняем в базе данных
        await userProjectRep.save(userProject);

        if (headProject){
            headProject.parent = userProject;
            await userProjectRep.save(headProject);
        }
    },

    async getData(id: number){
        const user = await this.findOne({
            where: { id: id },
            relations: ["projects", "projects.project"], // Загружаем связанные проекты
        });
        if (!user)
            throw new Error("user dont exist")
        const result: UserDTORelation = {
            id: user.id, email: user.email, username: user.username, projects: user?.projects?.map(userproj => userproj.project) ?? []}
        return result
    },


})