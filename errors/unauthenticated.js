const { StatusCodes } = require("http-status-codes");
const CustomError = require("./customError");

class Unauthenticated extends CustomError {
  constructor(message) {
    super(message);
    this.StatusCodes = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = Unauthenticated;
