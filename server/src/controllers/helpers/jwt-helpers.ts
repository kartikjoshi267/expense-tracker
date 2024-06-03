import jwt from 'jsonwebtoken';
import { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } from '../../config/config';
import BadRequestError from '../../utils/err/bad-request-error';
import CustomError from '../../utils/err/custom-error';

export const generateAccessToken = (userId: string) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {},
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: "5m",
        audience: userId,
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject(new CustomError());
        }
        resolve(token);
      }
    );
  });
};

export const generateRefreshToken = (userId: string) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {},
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1y",
        audience: userId,
      },
      (err, token) => {
        if (err) {
          reject(new CustomError());
        }
        resolve(token);
      }
    );
  });
};

export const verifyRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, REFRESH_TOKEN_SECRET, (err, payload) => {
      if (err) {
        reject(new BadRequestError('Invalid token'));
      }
      resolve(payload.aud);
    });
  });
}

export const verifyAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        reject(new BadRequestError('Invalid token'));
      }
      resolve(payload.aud);
    });
  });
}