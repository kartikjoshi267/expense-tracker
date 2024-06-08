import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import { SALT_ROUND } from "../config/config";

const userSchema: mongoose.Schema = new mongoose.Schema({
  name: {
    "type": String,
    "required": true
  },
  email: {
    "type": String,
    "required": true,
    "unique": true
  },
  password: {
    "type": String,
    "required": function() {
      return !this.googleAuth;
    },
  },
  expenses: {
    "type": [mongoose.SchemaTypes.ObjectId],
    "ref": "expense",
    "default": []
  },
  sources: {
    "type": [mongoose.SchemaTypes.ObjectId],
    "ref": "source",
    "default": []
  },
  googleAuth: {
    "type": Boolean,
    "default": false
  },
  googleAccessToken: {
    "type": String,
    "default": null
  },
  googleRefreshToken: {
    "type": String,
    "default": null
  },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcryptjs.hash(this.password as string, SALT_ROUND);
  }
  next();
});

const User = mongoose.model("user", userSchema);

export default User;