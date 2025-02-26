const userModel = require("../models/user.model");
const { use } = require("../routes");

class UserRepository {
  async create(user) {
    return userModel.create(user);
  }
  async update(id, data) {
    return userModel.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id) {
    return userModel.findByIdAndDelete(id);
  }
  async findOne({ query, select = "" }) {
    return userModel.findOne(query).select(select);
  }
  async findById(id) {
    return userModel.findById(id);
  }
  async findAll({ query, limit, skip, sort }) {
    return {
      total: await userModel.countDocuments(query),
      items: await userModel.find(query).sort(sort).skip(skip).limit(limit),
    };
  }
}

module.exports = new UserRepository();
