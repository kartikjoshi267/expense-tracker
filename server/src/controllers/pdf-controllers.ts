import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import BadRequestError from "../utils/err/bad-request-error";
import PDFService from "../services/pdf-service";

const PDFController = async (router: Router) => {
  router.get("/", authMiddleware, async (req, res) => {
    const userId = req.headers.userId;
    if (!userId) {
      throw new BadRequestError("User not found");
    }

    await PDFService.generatePDFFromExpenses(userId as string, res);
  });
}

export default PDFController;