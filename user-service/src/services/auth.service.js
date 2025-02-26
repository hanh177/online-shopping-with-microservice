const {
  ConflictError,
  BadRequest,
  Unauthorized,
} = require("../core/errorResponse");
const {
  generateSignature,
  generatePassword,
  validatePassword,
} = require("../utils/auth.util");
const { pickObjectData } = require("../utils");
const userRepository = require("../repositories/user.repository");

class AuthService {
  static register = async (data) => {
    const holderUser = await userRepository.findOne({ email: data.email });
    if (holderUser) throw ConflictError("Email existed");
    const newUser = await userRepository.create({
      ...data,
      password: await generatePassword(data.password),
    });

    const payload = pickObjectData(newUser, ["_id", "name", "email"]);
    const accessToken = await generateSignature(payload);

    return {
      user: payload,
      accessToken,
    };
  };
  static login = async ({ email, password }) => {
    const user = await userRepository.findOne({
      query: { email },
      select: "+password",
    });
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
