const { OK } = require("../core/successResponse");
const userModel = require("../models/user.model");
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

  getAll = async (req, res, next) => {
    return OK({
      res,
      metadata: await userModel.find(req.query),
    });
  };
}

module.exports = new UserController();
