import { Request, Response } from "express";

//Value Object

type Product = {
  id?: string;
  title: string;
  price: number;
  thumbnail: string;
};

//test product for check

const testProduct: Product = {
  id: "1",
  title: "test",
  price: 100,
  thumbnail: "test",
};

//App

class ProductApp {
  private products: Product[] = [testProduct];

  constructor() {}

  getAll(): Product[] {
    return this.products;
  }

  getById(id: string): Product | undefined {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return product;
    }
  }

  create(product: Product): void {
    console.log("product es: ", product);
    product.id = (this.products.length + 1).toString();
    this.products.push(product);
  }

  edit(id: string, newProduct: Product): Product | boolean {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      product.title = newProduct.title || product.title;
      product.price = newProduct.price || product.price;
      product.thumbnail = newProduct.thumbnail || product.thumbnail;
      return product;
    } else {
      return false;
    }
  }

  delete(id: string): boolean {
    const product = this.products.find((p) => p.id === id);

    if (product) {
      this.products = this.products.filter((p) => p.id !== id);
      return true;
    } else {
      return false;
    }
  }
}

const productApi = new ProductApp();

export default productApi;
