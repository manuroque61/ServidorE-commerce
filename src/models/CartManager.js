import fs from "fs-extra";

class CartManager {
  constructor() {
    this.path = "../data/carts.json";
    this.initFile();
  }

  async initFile() {
    if (!(await fs.pathExists(this.path))) {
      await fs.writeJson(this.path, []);
    }
  }

  async getCart(id) {
    const carts = await fs.readJson(this.path);
    return carts.find((c) => c.id === id);
  }

  async addCart() {
    const carts = await fs.readJson(this.path);
    const newCart = { id: carts.length ? carts[carts.length - 1].id + 1 : 1, products: [] };
    carts.push(newCart);
    await fs.writeJson(this.path, carts);
    return newCart;
  }
}

export default new CartManager();
