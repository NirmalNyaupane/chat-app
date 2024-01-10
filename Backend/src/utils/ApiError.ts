class ApiError extends Error {
  statusCode: number;
  error?: string[] | string;
  stack?: string | undefined;
  constructor(
    statusCode: number,
    message: string,
    error?: string[] | string,
    stack?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
