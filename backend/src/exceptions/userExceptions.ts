export class FindUserError extends Error{
    constructor(message: string = "Пользователь не существует") {
        super(message); 
        this.name = 'FindUserError';
        Object.setPrototypeOf(this, FindUserError.prototype)
    }
}