const { StatusCodes } = require("http-status-codes");
const CustomError = require("./customError");

class Unauthorized extends CustomError {
  constructor(message) {
    super(message);
    this.StatusCodes = StatusCodes.FORBIDDEN;
  }
}

module.exports = Unauthorized;
