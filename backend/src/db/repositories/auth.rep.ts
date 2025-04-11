import { UserCreateDTO } from "../../schemas/dto/userDTO";
import db from "../db";
import { UserORM } from "../orm/userOrm";

export const AuthRepository = db.getRepository(UserORM).extend({
    async authorizationQuery(userData: UserCreateDTO) {
        const savedUser = await this.save(userData);
        return savedUser.id;    }
})