import { Router } from "express";
import UserController from "../controllers/user-controllers";

const router = Router();

UserController(router);

export default router;