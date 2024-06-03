import { IRouter, Request, Response, Router } from "express";
import ApiResponseBuilder from "../utils/api-response-builder";
import StatusCode from "../enums/status-codes";
import User from "../models/user.model";
import BadRequestError from "../utils/err/bad-request-error";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import { generateAccessToken } from "./utils/access-token";
import { generateRefreshToken } from "./utils/refresh-token";

const UserController = async (router: IRouter<Router>) => {
  router.post('/register', async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new BadRequestError("Name, email and password are required");
    }

    const user = await User.findOne({
      email
    });

    if (user) {
      throw new BadRequestError("User already exists");
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(StatusCode.CREATED).json(
      new ApiResponseBuilder()
        .statusCode(StatusCode.CREATED)
        .message("User registered successfully")
        .build()
    );
  });

  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError("Invalid email or password");
    }

    const user = await User.findOne({
      email
    });
    
    if (!user) {
      throw new BadRequestError("Invalid email or password");
    }

    const isMatch = await bcryptjs.compare(password, user.password as string);

    if (!isMatch) {
      throw new BadRequestError("Invalid email or password");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(StatusCode.OK).json(
      new ApiResponseBuilder()
        .statusCode(StatusCode.OK)
        .message("User logged in successfully")
        .data({ accessToken })
        .build()
    );
  });
}

export default UserController;