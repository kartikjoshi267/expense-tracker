import Expense from "../models/expense.model";
import Source from "../models/source.model";
import User from "../models/user.model";
import BadRequestError from "../utils/err/bad-request-error";

class SourceService {
  public static async createSource(name: string, type: string, userId: string): Promise<any> {
    const source = new Source({ name, type, user: userId });
    await source.save();

    const user = await User.findByIdAndUpdate(userId, {
      $push: { sources: source._id }
    });

    return source;
  }

  public static async getSources(userId: string): Promise<any> {
    const sources = await Source.find({ user: userId }).populate("expenses");
    return sources;
  }

  public static async getSource(userId: string, sourceId: string): Promise<any> {
    const source = await Source.findOne({ _id: sourceId, user: userId }).populate("expenses");
    return source;
  }

  public static async deleteSource(userId: string, sourceId: string): Promise<void> {
    const source = await Source.findOne({ _id: sourceId, user: userId });
    if (!source) {
      throw new BadRequestError("Source not found");
    }

    const expenses: string[] = source.expenses as string[];
    for (let i = 0; i < expenses.length; i++) {
      await User.findByIdAndUpdate(userId, {
        $pull: { expenses: expenses[i] }
      });
      await Expense.deleteOne({ _id: expenses[i], user: userId, source: source._id });
    }

    await Source.deleteOne({ _id: sourceId, user: userId });
    await User.findByIdAndUpdate(userId, {
      $pull: { sources: sourceId }
    });
    return;
  }

  public static async updateSource(userId: string, sourceId: string, name: string, type: string): Promise<any> {
    const source = await Source.findOne({ _id: sourceId, user: userId }).populate("expenses");
    if (!source) {
      return null;
    }

    if (name) {
      source.name = name;
    }
    if (type) {
      source.type = type;
    }

    await source.save();
    return source;
  }
}

export default SourceService;