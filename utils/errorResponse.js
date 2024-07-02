class ErrorResponse extends Error {
  constructor(statusCode, message) {
    //call constructor of parent class
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
