import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { ProjectORM, UserORM, UserProjectORM } from "./orm/userOrm";
import { CommentsORM, TaskORM } from "./orm/taskOrm";

dotenv.config();

export const db = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DP_NAME,
    synchronize: true,
    logging: true,
    entities: [UserORM, TaskORM, ProjectORM, UserProjectORM, CommentsORM],
    subscribers: [],
    migrations: [],
})