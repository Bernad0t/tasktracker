export class FindUserError extends Error{
    status: number
    constructor(message: string = "Пользователь не существует") {
        super(message); 
        this.name = 'FindUserError';
        this.status = 401;
        Object.setPrototypeOf(this, FindUserError.prototype)
    }
}

export class AccessError extends Error{
    status: number
    constructor(message: string = "Недостаточно прав") {
        super(message); 
        this.name = 'AccessError';
        this.status = 409;
        Object.setPrototypeOf(this, FindUserError.prototype)
    }
}