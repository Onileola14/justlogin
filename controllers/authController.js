const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const createUser = require("../utils/createUser");
const { attachCookiesToResponse } = require("../utils/jwt");
const User = require("../models/User");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new CustomError.BadRequest("provide your full details");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new CustomError.BadRequest("email already exists");
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, password, role });
  const tokenUser = createUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json(tokenUser);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequest("provide your email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.Unauthenticated("invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new CustomError.Unauthenticated("invalid credentials");
  }
  const tokenUser = createUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json(tokenUser);
};

const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
module.exports = {
  register,
  login,
  logout,
};
