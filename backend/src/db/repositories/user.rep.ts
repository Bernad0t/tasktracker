import { FindOptionsWhere } from "typeorm";
import db from "../db";
import { UserORM } from "../orm/userOrm";

export const UserRepository = db.getRepository(UserORM).extend({
    async findUserQueryOR<T extends Object>(userData: T){
        const condition = Object.keys(userData).map(key => {return {[key]: userData[key as keyof typeof userData]}}) // могут быть undef поля
        const user = await this.find({
            where: condition.filter(cond => cond != undefined) as FindOptionsWhere<UserORM>[]
        })
        return user[0]
    }
})