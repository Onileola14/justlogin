const CustomError = require("../errors/index");
const { StatusCodes } = require("http-status-codes");
// const createUser = require("../utils/createUser");
const User = require("../models/User");
const checkPermission = require("../utils/checkPermission");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users: users, nHits: users.length });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id, role: "user" }).select(
    "-password",
  );

  if (!user) {
    throw new CustomError.BadRequest(
      `there is no user with this id - ${req.params.id}`,
    );
  }
  checkPermission(req.user, user._id);

  res.status(StatusCodes.OK).json({ user: user });
};

const deleteUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOneAndDelete({ _id: userId });

  if (!user) {
    throw new CustomError.BadRequest(
      `there is no user with this id - ${userId}`,
    );
  }

  checkPermission(req.user, user._id);

  res.status(StatusCodes.OK).json({ msg: "user deleted successfully" });
};

const updateUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOneAndUpdate({ _id: userId , }, req.body, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) {
    throw new CustomError.BadRequest(
      `there is no user with this id - ${userId}`,
    );
  }

  res
    .status(StatusCodes.OK)
    .json({ user: user, msg: "user update successfully" });
};

module.exports = {
  getSingleUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
