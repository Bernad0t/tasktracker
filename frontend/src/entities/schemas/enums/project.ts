export enum TypeProject {
    group,
    direct,
}

export enum Role {
    admin,
    user,
}

export enum StatusTask { // я беру .keys(), где порядок важен для правильного отображения
    // unsigned = 4,
    assigned = 0,
    processing = 1,
    testing = 3,
    done = 2,
}
