const BadRequest = require("./badRequest");
const NotFound = require("./not-found-error");
const Unauthenticated = require("./unauthenticated");
const Unauthorized = require("./unauthorized");

module.exports = {
  BadRequest,
  NotFound,
  Unauthenticated,
  Unauthorized,
};
