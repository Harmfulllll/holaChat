class apiError extends Error {
  constructor(
    statusCode,
    message = "Something is wrong!",
    errors = [],
    stack = ""
  ) {
    super(message);
    (this.statusCode = statusCode),
      (this.message = message),
      (this.data = null),
      (this.success = false),
      (this.errors = errors);
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
  ToJson() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      errors: this.errors,
      success: this.success,
    };
  }
}

export default apiError;
