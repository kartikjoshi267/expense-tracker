import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../../config/config';

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
};