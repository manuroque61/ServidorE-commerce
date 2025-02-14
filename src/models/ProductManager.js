import fs from "fs-extra";

class ProductManager {
  constructor() {
    this.path = "../data/products.json";
    this.initFile();
  }

  async initFile() {
    if (!(await fs.pathExists(this.path))) {
      await fs.writeJson(this.path, []);
    }
  }

  async getAll() {
    return await fs.readJson(this.path);
  }

  async addProduct(product) {
    const products = await this.getAll();
    product.id = products.length ? products[products.length - 1].id + 1 : 1;
    products.push(product);
    await fs.writeJson(this.path, products);
    return product;
  }

  async deleteProduct(id) {
    let products = await this.getAll();
    products = products.filter((p) => p.id !== id);
    await fs.writeJson(this.path, products);
  }
}

export default new ProductManager();
