import { IRouter, Router } from "express";
import StatusCode from "../enums/status-codes";
import ApiResponseBuilder from "../utils/api-response-builder";
import SourceType from "../enums/source-types";
import { authMiddleware } from "../middlewares/auth-middleware";
import BadRequestError from "../utils/err/bad-request-error";
import SourceService from "../services/source-service";

const SourceController = async (router: IRouter<Router>) => {
  router.get("/types", async (req, res) => {
    res.status(StatusCode.OK).json(
      new ApiResponseBuilder()
        .statusCode(StatusCode.OK)
        .data(Object.values(SourceType))
        .build()
    );
  });

  router.post("/", authMiddleware, async (req, res) => {
    const userId = req.headers.userId;
    if (!userId) {
      throw new BadRequestError("User not found");
    }
    
    const { name, type } = req.body;
    if (!name || !type) {
      throw new BadRequestError("Name and type are required");
    }

    if (!Object.values(SourceType).includes(type)) {
      throw new BadRequestError("Invalid source type");
    }

    const source = await SourceService.createSource(name, type, userId as string);

    res.status(StatusCode.CREATED).json(
      new ApiResponseBuilder()
        .statusCode(StatusCode.CREATED)
        .message("Source created successfully")
        .data(source)
        .build()
    );
  });

  router.get("/", authMiddleware, async (req, res) => {
    const userId = req.headers.userId;
    if (!userId) {
      throw new BadRequestError("User not found");
    }

    const sources = await SourceService.getSources(userId as string);

    res.status(StatusCode.OK).json(
      new ApiResponseBuilder()
        .statusCode(StatusCode.OK)
        .data(sources)
        .build()
    );
  });

  router.get("/:id", authMiddleware, async (req, res) => {
    const userId = req.headers.userId;
    if (!userId) {
      throw new BadRequestError("User not found");
    }

    const sourceId = req.params.id;
    const source = await SourceService.getSource(userId as string, sourceId);

    res.status(StatusCode.OK).json(
      new ApiResponseBuilder()
        .statusCode(StatusCode.OK)
        .data(source)
        .build()
    );
  });

  router.delete("/:id", authMiddleware, async (req, res) => {
    const userId = req.headers.userId;
    if (!userId) {
      throw new BadRequestError("User not found");
    }
    
    const sourceId = req.params.id;
    await SourceService.deleteSource(userId as string, sourceId);

    res.status(StatusCode.OK).json(
      new ApiResponseBuilder()
        .statusCode(StatusCode.OK)
        .message("Source deleted successfully")
        .build()
    );
  });

  router.put("/:id", authMiddleware, async (req, res) => {
    const userId = req.headers.userId;
    if (!userId) {
      throw new BadRequestError("User not found");
    }

    const sourceId = req.params.id;
    const { name, type } = req.body;
    if (!name && !type) {
      throw new BadRequestError("Name or type is required");
    }

    if (type && !Object.values(SourceType).includes(type)) {
      throw new BadRequestError("Invalid source type");
    }

    const source = await SourceService.updateSource(userId as string, sourceId, name, type);

    res.status(StatusCode.OK).json(
      new ApiResponseBuilder()
        .statusCode(StatusCode.OK)
        .message("Source updated successfully")
        .data(source)
        .build()
    );
  });
};

export default SourceController;