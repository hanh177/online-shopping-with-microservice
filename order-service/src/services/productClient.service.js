const axios = require("axios");

class ProductServiceClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || `http://localhost:4000`;
  }

  async getProduct(productId) {
    try {
      const response = await axios.get(`${this.baseUrl}/products/${productId}`);
      console.log(`${this.baseUrl}/products/${productId}`);

      return response.data.metadata;
    } catch (error) {
      console.error("❌ Error fetching product:", error.message);
      throw new Error("Product Service is unavailable");
    }
  }
}

module.exports = new ProductServiceClient();
