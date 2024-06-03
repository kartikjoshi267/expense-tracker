import StatusCode from "../../enums/status-codes";
import CustomError from "./custom-error";

export default class BadRequestError extends CustomError {
  public constructor(message: string) {
    super(message, StatusCode.BAD_REQUEST);
  }
}