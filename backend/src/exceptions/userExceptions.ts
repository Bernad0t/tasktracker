export class FindUserError extends Error{
    constructor(message: string = "Пользователь не существует") {
        super(message); 
        this.name = 'FindUserError';
        Object.setPrototypeOf(this, FindUserError.prototype)
    }
}

export class AccessError extends Error{
    constructor(message: string = "Недостаточно прав") {
        super(message); 
        this.name = 'AccessError';
        Object.setPrototypeOf(this, FindUserError.prototype)
    }
}