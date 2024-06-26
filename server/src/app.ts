require('express-async-errors');

import express, { NextFunction, Request, Response } from 'express';
import ApiResponseBuilder from './utils/api-response-builder';
import CustomError from './utils/err/custom-error';
import connectToDB from './database/db';
import userRouter from './routes/user-routes';
import expenseRouter from './routes/expense-routes';
import sourceRouter from './routes/source-routes';
import pdfRouter from './routes/pdf-routes';
import cors from 'cors';
import StatusCode from './enums/status-codes';
import logger from './utils/logger';
import NotFoundError from './utils/err/not-found-error';
import { FRONTEND_URL } from './config/config';
// import session from 'express-session';

const app = express();
const corsOptions = {
  origin: FRONTEND_URL,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions))
connectToDB();
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.json(new ApiResponseBuilder().message("Server is running 🚀🚀").build());
});

// Session middleware
// app.use(session({
//   secret: "SESSION_SECRET",
//   resave: false,
//   saveUninitialized: true,
// }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/expenses", expenseRouter);
app.use("/api/v1/sources", sourceRouter);
app.use("/api/v1/pdf", pdfRouter);

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