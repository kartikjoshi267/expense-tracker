import StatusCode from "../../enums/status-codes";

export default class CustomError extends Error {
  public statusCode: StatusCode = StatusCode.INTERNAL_SERVER_ERROR;
  public error: string = "Internal Server Error";

  public constructor(message?: string, statusCode?: StatusCode) {
    super(message);
    this.error = message || "We are having some server issues. Please try again later.";
    this.statusCode = statusCode || StatusCode.INTERNAL_SERVER_ERROR;
  }

  public toJSON() {
    return {
      statusCode: this.statusCode,
      error: this.error,
    };
  }

  public build() {
    return {
      statusCode: this.statusCode,
      error: this.error,
    };
  }
}