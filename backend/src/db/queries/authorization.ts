import { FindUserError } from "../../exceptions/customExceptions/userExceptions";
import { UserCreateDTO } from "../../schemas/dto/userDTO";
import { db } from "../db";
import { UserORM } from "../orm/userOrm";

export async function findUserQuery(userData: {email: string, login: string}){
    const userRep = db.getRepository(UserORM)
    const user = await userRep.findOneBy(userData)
    return user
}

export async function registrationQuery(userData: UserCreateDTO) {
    if (await findUserQuery(userData))
        throw new FindUserError("Такой пользователь уже существует")
    await db
        .createQueryBuilder()
        .insert()
        .into(UserORM)
        .values([
            userData
        ])
        .execute()

}