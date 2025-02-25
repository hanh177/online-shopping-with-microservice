const {
  ConflictError,
  BadRequest,
  Unauthorized,
} = require("../core/errorResponse");
const userModel = require("../models/user.model");
const {
  generateSignature,
  generatePassword,
  validatePassword,
} = require("../utils/auth.util");
const { pickObjectData } = require("../utils");

class AuthService {
  static register = async ({ name, email, password }) => {
    const holderUser = await userModel.findOne({ email });
    if (holderUser) throw ConflictError("Email existed");
    const newUser = await userModel.create({
      name,
      email,
      password: await generatePassword(password),
    });

    const payload = pickObjectData(newUser, ["_id", "name", "email"]);
    const accessToken = await generateSignature(payload);

    return {
      user: payload,
      accessToken,
    };
  };
  static login = async ({ email, password }) => {
    const user = await userModel.findOne({ email });
    if (!user) throw BadRequest("Email not found");

    const isMatch = await validatePassword(password, user.password);
    if (!isMatch) throw Unauthorized("Password is not correct");

    const payload = pickObjectData(user, ["_id", "name", "email"]);
    const accessToken = await generateSignature(payload);

    return {
      user: payload,
      accessToken,
    };
  };
}

module.exports = AuthService;
