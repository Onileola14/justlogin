const express = require("express");
const router = express.Router();
const authenticateUser = require('../middlewares/authentication')
const {
  getSingleUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.route("/").get(getAllUsers);
router.route("/:id").get(authenticateUser, getSingleUser).delete(authenticateUser, deleteUser).patch(authenticateUser, updateUser);

module.exports = router