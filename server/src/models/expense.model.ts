import mongoose from "mongoose";

const expenseSchema: mongoose.Schema = new mongoose.Schema({
  title: {
    "type": String,
    "required": true
  },
  amount: {
    "type": Number,
    "required": true
  },
  description: {
    "type": String,
    "default": ""
  },
  date: {
    "type": Date,
    "required": true
  },
  user: {
    "type": mongoose.SchemaTypes.ObjectId,
    "ref": "user",
    "required": true
  },
  source: {
    "type": mongoose.SchemaTypes.ObjectId,
    "ref": "source",
    "required": true
  }
}, { timestamps: true });

const Expense = mongoose.model("expense", expenseSchema);

export default Expense;