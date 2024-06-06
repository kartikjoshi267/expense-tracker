import Expense from "../models/expense.model";
import Source from "../models/source.model";
import User from "../models/user.model";

class ExpenseService {
  public static async create(title: string, description: string, amount: number, date: string, sourceId: string, userId: string) {
    const expense = new Expense({
      title,
      description,
      amount,
      date: new Date(date),
      user: userId,
      source: sourceId
    });
    
    await expense.save();
    
    await Source.findOneAndUpdate({
      _id: sourceId,
      user: userId,
    }, {
      $push: { expenses: expense._id }
    });

    await User.findByIdAndUpdate(userId, {
      $push: { expenses: expense._id }
    });

    return expense;
  }

  public static async getExpenses(userId: string) {
    const expenses = await Expense.find({ user: userId }).populate({
      path: "source",
      populate: {
        path: "expenses"
      }
    });
    return expenses;
  }

  public static async getExpensesBySource(userId: string, sourceId: string) {
    const expenses = await Expense.find({ user: userId, source: sourceId }).populate({
      path: "source",
      populate: {
        path: "expenses"
      }
    });
    return expenses;
  }

  public static async deleteExpense(userId: string, expenseId: string) {
    const expense = await Expense.findOne({ _id: expenseId, user: userId });
    if (!expense) {
      return null;
    }

    await Expense.deleteOne({ _id: expenseId, user: userId });
    await Source.findByIdAndUpdate(expense.source, {
      $pull: { expenses: expenseId }
    });
    await User.findByIdAndUpdate(userId, {
      $pull: { expenses: expenseId }
    });

    return;
  }

  public static async updateExpense(userId: string, expenseId: string, title: string, description: string, amount: number, date: string, sourceId: string) {
    const expense = await Expense.findOne({ _id: expenseId, user: userId }).populate({
      path: "source",
      populate: {
        path: "expenses"
      }
    });
    if (!expense) {
      return null;
    }

    if (title) {
      expense.title = title;
    }
    if (description) {
      expense.description = description;
    }
    if (amount) {
      expense.amount = amount;
    }
    if (date) {
      expense.date = new Date(date);
    }
    if (sourceId) {
      expense.source = sourceId;
    }

    await expense.save();
    return expense;
  }
}

export default ExpenseService;