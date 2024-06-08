import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../controllers/helpers/jwt-helpers";
import User from "../models/user.model";
import BadRequestError from "../utils/err/bad-request-error";
import bcryptjs from "bcryptjs";

type TokenResponse = {
  accessToken: any;
  refreshToken: any;
}

class UserService {
  public static async register(name: string, email: string, password: string): Promise<void> {
    const user = await User.findOne({
      email
    });

    if (user) {
      throw new BadRequestError("User already exists");
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    return;
  }

  public static async login(email: string, password: string): Promise<TokenResponse> {
    const user = await User.findOne({
      email
    });
    
    if (!user) {
      throw new BadRequestError("Invalid email or password");
    }

    if (user.googleAuth) {
      throw new BadRequestError("This user is registered with Google");
    }

    const isMatch = await bcryptjs.compare(password, user.password as string);

    if (!isMatch) {
      throw new BadRequestError("Invalid email or password");
    }

    const userId = user._id.toString();

    const accessToken = await generateAccessToken(userId);
    const refreshToken = await generateRefreshToken(userId);

    return {
      accessToken,
      refreshToken
    };
  }

  public static async refreshToken(refreshToken: string): Promise<TokenResponse> {
    const userId = await verifyRefreshToken(refreshToken);

    const accessToken = await generateAccessToken(userId as string);
    const newRefreshToken = await generateRefreshToken(userId as string);
    return {
      accessToken: accessToken,
      refreshToken: newRefreshToken
    };
  }

  public static async getUserById(userId: string): Promise<any> {
    const user = await User.findById(userId).select(
      "-password -__v -_id"
    ).populate({
      path: "expenses",
      populate: {
        path: "source"
      }
    }).populate({
      path: "sources",
      populate: {
        path: "expenses"
      }
    });

    if (!user) {
      throw new BadRequestError("Invalid token");
    }

    return user;
  }
}

export default UserService;