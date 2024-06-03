import mongoose from "mongoose";
import SourceType from "../enums/source-types";

const sourceSchema: mongoose.Schema = new mongoose.Schema({
  name: {
    "type": String,
    "required": true
  },
  type: {
    "type": String,
    "enum": Object.values(SourceType),
    "required": true
  },
  user: {
    "type": mongoose.SchemaTypes.ObjectId,
    "ref": "user",
    "required": true
  },
  expenses: {
    "type": [mongoose.SchemaTypes.ObjectId],
    "ref": "expense",
    "default": []
  },
});

const Source = mongoose.model("source", sourceSchema);

export default Source;