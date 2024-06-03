import jwt from 'jsonwebtoken';
import { REFRESH_TOKEN_SECRET } from '../../config/config';

export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: "15d",
    }
  );
};