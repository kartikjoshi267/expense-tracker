import StatusCode from "../enums/status-codes";

export default class ApiResponseBuilder {
  private _statusCode?: StatusCode | undefined = StatusCode.OK;
  private _message?: string | undefined;
  private _data?: any;

  public statusCode(statusCode: StatusCode): ApiResponseBuilder {
    this._statusCode = statusCode;
    return this;
  }

  public message(message: string): ApiResponseBuilder {
    this._message = message;
    return this;
  }

  public data(data: any): ApiResponseBuilder {
    this._data = data;
    return this;
  }

  public build() {
    return {
      statusCode: this._statusCode,
      message: this._message,
      data: this._data,
    };
  }
}