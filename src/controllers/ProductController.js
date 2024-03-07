import { productTemplate, fakeProducts } from "../models/ProductModel";

export class ProductController {
  constructor() {
    this.products = fakeProducts;
    this.newProduct = productTemplate;
  }

  addProduct(product) {
    this.products = [...this.products, product];
    this.newProduct = { ...productTemplate };
  }

  editProduct(index, product) {
    this.products = this.products.map((item, idx) => (idx === index ? product : item));
  }

  deleteProduct(index) {
    this.products = this.products.filter((_, idx) => idx !== index);
  }
}
