class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.explination = message;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
