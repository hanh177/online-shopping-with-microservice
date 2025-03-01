const { Unauthorized } = require("../core/errorResponse");
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");

const decodeSignature = async (signature) => {
  try {
    const payload = await jwt.verify(signature, JWT_SECRET);
    return payload;
  } catch (e) {
    return null;
  }
};

const isAuthenticated = async (req, res, next) => {
  const token = (req.headers?.authorization || "").split(" ")[1];

  if (!token) {
    return next(Unauthorized("Token is required"));
  }
  const decoded = await decodeSignature(token);

  if (!decoded) {
    return next(Unauthorized("Token is invalid"));
  }

  req.user = decoded;
  next();
};

const loadUser = async (req, res, next) => {
  const token = (req.headers?.authorization || "").split(" ")[1];
  req.user = null;
  if (token) {
    const decoded = await decodeSignature(token);
    if (decoded) {
      req.user = decoded;
    }
  }
  next();
};

module.exports = {
  isAuthenticated,
  loadUser,
};
