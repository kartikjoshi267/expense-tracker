import { IRouter, Router } from "express";
import SourceController from "../controllers/source-controllers";

const router: IRouter<Router> = Router();

SourceController(router);

export default router;