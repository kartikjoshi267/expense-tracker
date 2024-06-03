import mongoose from "mongoose";
import logger from "../utils/logger";
import CustomError from "../utils/err/custom-error";
import { MONGODB_URI } from "../config/config";

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "expense-tracker",
    });
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error);
    throw new CustomError("Error connecting to MongoDB");
  }
};

export default connectToDB;