import express from 'express';
import isLoginedMiddleware from '../middlewaries/isLoginedMiddleware';
import projectRouter from './project';

const isAuthRouter = express.Router()

isAuthRouter.use(isLoginedMiddleware)
isAuthRouter.use("/project", projectRouter)

export default isAuthRouter
