import { Router } from "express";
import UserController from "../controllers/user-controllers";
import UserOAuthController from "../controllers/user-oauth-controllers";

const router: Router = Router();

UserController(router);
UserOAuthController(router);

export default router;