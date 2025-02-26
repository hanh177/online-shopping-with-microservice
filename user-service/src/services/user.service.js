const userRepository = require("../repositories/user.repository");
const { populateDbQuery, populateDBSort } = require("../utils/dbQuery");

class UserService {
  static async create(data) {
    return await userRepository.create(data);
  }
  static async update(id, data) {
    return await userRepository.update(id, data);
  }
  static async delete(id) {
    return await userRepository.delete(id);
  }
  static async findOne(query) {
    const matchQuery = populateDbQuery(query, {
      text: ["name"],
      boolean: ["status"],
    });
    return await userRepository.findOne(matchQuery);
  }
  static async findById(id) {
    return await userRepository.findById(id);
  }
  static async findAll({ page = 0, take = 10, ...query }) {
    const _page = Math.max(0, page - 1);
    const _take = parseInt(take, 10);

    const matchQuery = populateDbQuery(query, {
      text: ["name"],
      boolean: ["status"],
    });

    const sort = populateDBSort(query);
    return await userRepository.findAll({
      query: matchQuery,
      limit: _take,
      skip: _page * _take,
      sort,
    });
  }
}

module.exports = UserService;
