const { OK } = require("../core/successResponse");
const { omitObjectData } = require("../utils");

class UserController {
  getMe = async (req, res, next) => {
    return OK({
      res,
      metadata: omitObjectData(req.user, ["password", "status"]),
    });
  };
  findOne = async (req, res, next) => {
    return OK({
      res,
      metadata: {},
    });
  };
  update = async (req, res, next) => {
    return OK({
      res,

      metadata: {},
    });
  };
}

module.exports = new UserController();
