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

class UserService {
  static async createUser(data) {}
  static async updateUser(data) {}
  static async deleteUser(data) {}

  static async findOneUser(data) {}
  static async getAllUsers(data) {}
}

module.exports = UserService;
