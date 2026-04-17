const { isTokenValid } = require("../utils/jwt");
const CustomError = require("../errors");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomError.NotFound("no token found");
  }

  try {
    const { name, email, userId, role } =  isTokenValid({ token });
    req.user = { name, email, userId, role };
    next();
  } catch (error) {
    throw new CustomError.Unauthorized("invalid token");
  }
};

module.exports = authenticateUser;
