import { Router } from "express";
import PDFController from "../controllers/pdf-controllers";

const router: Router = Router();

PDFController(router);

export default router;