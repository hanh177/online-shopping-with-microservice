const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

module.exports.generatePassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

module.exports.validatePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

module.exports.generateSignature = async (payload, expiresIn = "30d") => {
  try {
    return await jwt.sign(payload, JWT_SECRET, { expiresIn });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.decodeSignature = async (signature) => {
  try {
    const payload = await jwt.verify(signature, JWT_SECRET);
    return payload;
  } catch (e) {
    return null;
  }
};
