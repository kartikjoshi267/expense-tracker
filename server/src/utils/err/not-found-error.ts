import StatusCode from "../../enums/status-codes";
import CustomError from "./custom-error";

export default class NotFoundError extends CustomError {
  public constructor(message: string) {
    super(new Error(message), StatusCode.NOT_FOUND);
  }
}