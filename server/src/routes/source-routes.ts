import { Router } from "express";
import SourceController from "../controllers/source-controllers";

const router: Router = Router();

SourceController(router);

export default router;