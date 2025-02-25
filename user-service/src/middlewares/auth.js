const { Unauthorized } = require("../core/errorResponse");
const userModel = require("../models/user.model");
const { decodeSignature } = require("../utils/auth.util");

const isAuthenticated = async (req, res, next) => {
  const token = (req.headers?.authorization || "").split(" ")[1];
  if (!token) {
    return next(Unauthorized("Token is required"));
  }

  const decoded = await decodeSignature(token);
  if (!decoded) {
    return next(Unauthorized("Token is invalid"));
  }

  req.user = (await userModel.findOne({ _id: decoded._id })).toObject();
  next();
};

const loadUser = async (req, res, next) => {
  const token = (req.headers?.authorization || "").split(" ")[1];
  req.user = null;
  if (token) {
    const decoded = await decodeSignature(token);
    if (decoded) {
      req.user = (await userModel.findOne({ _id: decoded._id })).toObject();
    }
  }
  next();
};

module.exports = {
  isAuthenticated,
  loadUser,
};
