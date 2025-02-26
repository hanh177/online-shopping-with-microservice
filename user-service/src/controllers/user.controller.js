const { OK } = require("../core/successResponse");
const userModel = require("../models/user.model");
const { omitObjectData } = require("../utils");
const userService = require("../services/user.service");
class UserController {
  getMe = async (req, res, next) => {
    return OK({
      res,
      metadata: req.user,
    });
  };
  findById = async (req, res, next) => {
    return OK({
      res,
      metadata: await userService.findById(req.params.id),
    });
  };
  update = async (req, res, next) => {
    return OK({
      res,
      metadata: await userService.update(req.user._id, req.body),
    });
  };
  getAll = async (req, res, next) => {
    return OK({
      res,
      metadata: await userService.findAll(req.query),
    });
  };
}

module.exports = new UserController();
