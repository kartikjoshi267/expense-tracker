import StatusCode from "../../enums/status-codes";

export default class CustomError {
  public statusCode: StatusCode = StatusCode.INTERNAL_SERVER_ERROR;
  public error: string = "Internal Server Error";

  public constructor(err: Error, statusCode?: StatusCode) {
    this.error = err.message || "We are having some server issues. Please try again later.";
    this.statusCode = statusCode || StatusCode.INTERNAL_SERVER_ERROR;
  }

  public build() {
    return {
      statusCode: this.statusCode,
      error: this.error,
    };
  }
}