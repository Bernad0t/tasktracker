import express, { Request, Response } from 'express';
import {router as authorizationRouter} from "./roots/authorization"

const app = express();
app.use(express.json());
app.use("/authorization", authorizationRouter)
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});