class CustomError extends Error{
    status: number
    constructor(message: string = "Серверная ошибка", status: number = 500) {
        super(message); 
        this.status = status;
        Object.setPrototypeOf(this, CustomError.prototype)
    }
}

export class FindUserError extends CustomError{
    constructor(message: string = "Пользователь не существует") {
        super(message, 401); 
        this.name = 'FindUserError';
        Object.setPrototypeOf(this, FindUserError.prototype)
    }
}

export class AccessError extends CustomError{
    constructor(message: string = "Недостаточно прав") {
        super(message, 409); 
        this.name = 'AccessError';
        Object.setPrototypeOf(this, AccessError.prototype)
    }
}

export class ProjectError extends CustomError{
    constructor(message: string = "Ошибка при добавлении проекта") {
        super(message, 409); 
        this.name = 'ProjectError';
        Object.setPrototypeOf(this, ProjectError.prototype)
    }
}