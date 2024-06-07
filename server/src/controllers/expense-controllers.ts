import { Router } from "express";
import ApiResponseBuilder from "../utils/api-response-builder";
import StatusCode from "../enums/status-codes";
import BadRequestError from "../utils/err/bad-request-error";
import ExpenseService from "../services/expense-service";
import { authMiddleware } from "../middlewares/auth-middleware";
import Source from "../models/source.model";

const ExpenseController = async (router: Router) => {
  router.post("/", authMiddleware, async (req, res) => {
    const { title, description, amount, date, sourceId } = req.body;
    if (!title || !amount || !date || !sourceId) {
      throw new BadRequestError("Title, amount, source and date are required");
    }

    const userId = req.headers.userId;
    if (!userId) {
      throw new BadRequestError("User not found");
    }

    const source = await Source.findById(sourceId);
    if (!source) {
      throw new BadRequestError("Source not found");
    }

    const expense = await ExpenseService.create(title, description, amount, date, sourceId, userId as string);

    res.status(StatusCode.CREATED).json(
      new ApiResponseBuilder()
        .statusCode(StatusCode.CREATED)
        .message("Expense created successfully")
        .data(expense)
        .build()
    );
  });

  router.get("/", authMiddleware, async (req, res) => {
    const userId = req.headers.userId;
    if (!userId) {
      throw new BadRequestError("User not found");
    }

    const expenses = await ExpenseService.getExpenses(userId as string);

    res.status(StatusCode.OK).json(
      new ApiResponseBuilder()
        .statusCode(StatusCode.OK)
        .data(expenses)
        .build()
    );
  });

  router.get('/source/:id', authMiddleware, async (req, res) => {
    const userId = req.headers.userId;
    if (!userId) {
      throw new BadRequestError("User not found");
    }

    const sourceId = req.params.id;
    if (!sourceId) {
      throw new BadRequestError("Source ID is required");
    }

    const expenses = await ExpenseService.getExpensesBySource(userId as string, sourceId);

    res.status(StatusCode.OK).json(
      new ApiResponseBuilder()
        .statusCode(StatusCode.OK)
        .data(expenses)
        .build()
    );
  });

  router.get("/:id", authMiddleware, async (req, res) => {
    const userId = req.headers.userId;
    if (!userId) {
      throw new BadRequestError("User not found");
    }

    const expenseId = req.params.id;
    if (!expenseId) {
      throw new BadRequestError("Expense ID is required");
    }

    const expenses = await ExpenseService.getExpenses(userId as string);

    const expense = expenses.find(expense => expense._id.toString() === expenseId);

    if (!expense) {
      throw new BadRequestError("Expense not found");
    }

    res.status(StatusCode.OK).json(
      new ApiResponseBuilder()
        .statusCode(StatusCode.OK)
        .data(expense)
        .build()
    );
  });

  router.post("/:id", authMiddleware, async (req, res) => {
    const userId = req.headers.userId;
    if (!userId) {
      throw new BadRequestError("User not found");
    }

    const expenseId = req.params.id;
    if (!expenseId) {
      throw new BadRequestError("Expense ID is required");
    }

    const expenses = await ExpenseService.getExpenses(userId as string);

    const expense = expenses.find(expense => expense._id.toString() === expenseId);

    if (!expense) {
      throw new BadRequestError("Expense not found");
    }

    await ExpenseService.deleteExpense(userId as string, expenseId);

    res.status(StatusCode.OK).json(
      new ApiResponseBuilder()
        .statusCode(StatusCode.OK)
        .message("Expense deleted successfully")
        .build()
    );
  });

  router.put("/:id", authMiddleware, async (req, res) => {
    const userId = req.headers.userId;
    if (!userId) {
      throw new BadRequestError("User not found");
    }

    const expenseId = req.params.id;
    if (!expenseId) {
      throw new BadRequestError("Expense ID is required");
    }

    const { title, description, amount, date, sourceId } = req.body;
    if (!title && !description && !amount && !date && !sourceId) {
      throw new BadRequestError("At least one field is required");
    }

    const expenses = await ExpenseService.getExpenses(userId as string);

    const expense = expenses.find(expense => expense._id.toString() === expenseId);

    if (!expense) {
      throw new BadRequestError("Expense not found");
    }

    const updatedExpense = await ExpenseService.updateExpense(userId as string, expenseId, title, description, amount, date, sourceId);

    if (!updatedExpense) {
      throw new BadRequestError("Expense not updated");
    }

    res.status(StatusCode.OK).json(
      new ApiResponseBuilder()
        .statusCode(StatusCode.OK)
        .message("Expense updated successfully")
        .data(updatedExpense)
        .build()
    );
  });
};

export default ExpenseController;