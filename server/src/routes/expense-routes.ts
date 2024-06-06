import { Router } from "express";
import ExpenseController from "../controllers/expense-controllers";

const router: Router = Router();

ExpenseController(router);

export default router;