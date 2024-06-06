import { IRouter, Request, Response, Router } from "express";
import ApiResponseBuilder from "../utils/api-response-builder";
import StatusCode from "../enums/status-codes";
import User from "../models/user.model";
import BadRequestError from "../utils/err/bad-request-error";
import bcryptjs from "bcryptjs";
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from "./helpers/jwt-helpers";
import { authMiddleware } from "../middlewares/auth-middleware";
import { eraseCookie, getCookie } from "../utils/cookies";
import UserService from "../services/user-service";

const UserController = async (router: IRouter<Router>) => {
  router.post('/register', async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new BadRequestError("Name, email and password are required");
    }

    await UserService.register(name, email, password);

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

    const { accessToken, refreshToken } = await UserService.login(email, password);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/api/v1/users/refresh-token",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
    });
    res.status(StatusCode.OK).json(
      new ApiResponseBuilder()
        .statusCode(StatusCode.OK)
        .message("User logged in successfully")
        .build()
    );
  });

  router.post("/refresh-token", async (req, res) => {
    const _refreshToken = getCookie(req, "refreshToken");
    if (!_refreshToken) {
      throw new BadRequestError("Invalid token");
    }

    const { refreshToken, accessToken } = await UserService.refreshToken(_refreshToken);
    
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/api/v1/users/refresh-token",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
    });
    res.status(StatusCode.OK).json(
      new ApiResponseBuilder()
        .statusCode(StatusCode.OK)
        .message("Token refreshed successfully")
        .build()
    );
  });

  router.get("/", authMiddleware, async (req, res) => {
    const userId = req.headers.userId;
    const user = await UserService.getUserById(userId as string);

    res.status(StatusCode.OK).json(
      new ApiResponseBuilder()
        .statusCode(StatusCode.OK)
        .message("User fetched successfully")
        .data(user)
        .build()
    );
  });

  router.post("/logout", authMiddleware, async (req, res) => {
    const userId = req.headers.userId;
    if (!userId) {
      throw new BadRequestError("Invalid user");
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(StatusCode.OK).json(
      new ApiResponseBuilder()
        .statusCode(StatusCode.OK)
        .message("User logged out successfully")
        .build()
    );
  });
}

export default UserController;