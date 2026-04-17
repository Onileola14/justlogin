const CustomError = require("../errors/index");
const checkPermission = (requestUser, resourceUserId) => {
  console.log(requestUser);
  console.log(resourceUserId);

  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new CustomError.UnauthorizedError(
    "you are not authorized to access this route",
  );
};

module.exports = checkPermission;
