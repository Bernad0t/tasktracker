import { BaseCustomError } from "../base";

export class FindUserError extends BaseCustomError{
    constructor(message: string = "Пользователь не существует") {
        super(message);
    }
}