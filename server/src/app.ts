require('express-async-errors');

import express, { NextFunction, Request, Response } from 'express';
import ApiResponseBuilder from './utils/api-response-builder';
import CustomError from './utils/err/custom-error';
import connectToDB from './database/db';
import userRouter from './routes/user-routes';
import expenseRouter from './routes/expense-routes';
import sourceRouter from './routes/source-routes';
import cors from 'cors';
import StatusCode from './enums/status-codes';
import logger from './utils/logger';
import NotFoundError from './utils/err/not-found-error';

const app = express();
app.use(cors({
  credentials: true,
}));
connectToDB();
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.json(new ApiResponseBuilder().message("Server is running 🚀🚀").build());
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/expenses", expenseRouter);
app.use("/api/v1/sources", sourceRouter);

app.use('*', (req: Request, res: Response) => {
  throw new NotFoundError("Route not found");
})

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(err.build());
  }
  
  logger.error(err);
  return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
    error: "We are having some server issues. Please try again later.",
    statusCode: StatusCode.INTERNAL_SERVER_ERROR,
  });
});

export default app;