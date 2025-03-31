import express from 'express';
import isLoginedMiddleware from '../middlewaries/isLoginedMiddleware';
import projectRouter from './project';
import taskRouter from './task';
import commentsRouter from './comments';
import userRouter from './user';

const isAuthRouter = express.Router()

isAuthRouter.use(isLoginedMiddleware)
isAuthRouter.use("/project", projectRouter)
isAuthRouter.use("/task", taskRouter)
isAuthRouter.use("/comm", commentsRouter)
isAuthRouter.use("/user", userRouter)

export default isAuthRouter
