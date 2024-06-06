import jwt, { JwtPayload } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../config/config';
import BadRequestError from '../utils/err/bad-request-error';
import CustomError from '../utils/err/custom-error';
import StatusCode from '../enums/status-codes';
import { NextFunction, Request, Response } from 'express';
import { getCookie } from '../utils/cookies';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = getCookie(req, "accessToken");
  if (token == null) {
    throw new BadRequestError('Invalid token');
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      throw new CustomError('Invalid token', StatusCode.FORBIDDEN);
    }
    req.headers.userId = (payload as JwtPayload).aud;
    next();
  });
}