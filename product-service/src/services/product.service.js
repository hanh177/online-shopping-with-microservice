const productRepository = require("../repositories/product.repository");
const { populateDBSort, populateDbQuery } = require("../utils/dbQuery");

class ProductService {
  static async find({ page = 0, take = 10, ...query }) {
    const _page = Math.max(0, page - 1);
    const _take = parseInt(take, 10);

    const matchQuery = populateDbQuery(query, {
      text: ["name", "category", "brand"],
      array: ["tags"],
      equal: ["owner"],
    });

    if (query.priceFrom && query.priceTo) {
      matchQuery.price = {
        $gte: parseInt(query.priceFrom, 10),
        $lte: parseInt(query.priceTo, 10),
      };
    }

    const sort = populateDBSort(query);
    return await productRepository.findAll({
      query: matchQuery,
      limit: _take,
      skip: _page * _take,
      sort,
    });
  }
  static async findById(id) {
    return productRepository.findById(id);
  }
  static async delete(id) {
    return productRepository.delete(id);
  }
  static async create(data) {
    return productRepository.create(data);
  }
  static async update(id, data) {
    return productRepository.update(id, data);
  }
}

module.exports = ProductService;
