import app from "./app";
import process from "process";
import logger from "./utils/logger";

const port = process.env.PORT || 5000;

process
  .on("unhandledRejection", (reason, promise) => {
    logger.error(
      reason,
      "Unhandled Promise Rejection in application",
    );
  })
  .on("uncaughtException", (err) => {
    logger.error(err, "Uncaught Exception thrown in application");
    process.exit(1);
  });

app.listen(port, () => {
  logger.info(`Server is listening at port ${port}`);
});