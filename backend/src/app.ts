import express, { Request, Response } from 'express';
import {router as authorizationRouter} from "./roots/authorization"
import cookieParser from 'cookie-parser';
import isAuthRouter from './roots/authRouter';
import morgan from 'morgan';
import cors from 'cors'

const port = 8000;

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', "PATCH"],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

const app = express();
app.use(cors(corsOptions))
app.use(morgan('combined'))
app.use(express.json());
app.use("/authorization", authorizationRouter)
app.use("/protected", isAuthRouter)
app.use(cookieParser())

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});