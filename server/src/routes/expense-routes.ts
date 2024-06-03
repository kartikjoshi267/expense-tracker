import { IRouter, Router } from "express";
import ExpenseController from "../controllers/expense-controllers";

const router: IRouter<Router> = Router();

ExpenseController(router);

export default router;