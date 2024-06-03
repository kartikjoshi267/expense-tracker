require('express-async-errors');

import express, { Request, Response } from 'express';
import ApiResponseBuilder from './utils/api-response-builder';
import CustomError from './utils/err/custom-error';
import connectToDB from './database/db';
import userRouter from './routes/user-routes';

const app = express();
connectToDB();
app.use(express.json());

app.use((err: CustomError, req: Request, res: Response, next: any) => {
  res.status(err.statusCode).json(err.build());
});

app.get('/', (req: Request, res: Response) => {
  res.json(new ApiResponseBuilder().message("Server is running 🚀🚀").build());
});

app.use("/api/v1/users", userRouter);

export default app;