import express, { Request, Response } from 'express';
import {router as authorizationRouter} from "./roots/authorization"
import cookieParser from 'cookie-parser';
import isAuthRouter from './roots/authRouter';

const port = 3000;

const app = express();
app.use(express.json());
app.use("/authorization", authorizationRouter)
app.use("/protected", isAuthRouter)
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});