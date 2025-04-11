import express, { Request, Response } from 'express';
import {router as authorizationRouter} from "./roots/authorization"
import cookieParser from 'cookie-parser';
import isAuthRouter from './roots/authRouter';
import morgan from 'morgan';

const port = 3001;

const app = express();
app.use(morgan('combined'))
app.use(express.json());
app.use("/authorization", authorizationRouter)
app.use("/protected", isAuthRouter)
app.use(cookieParser())

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});