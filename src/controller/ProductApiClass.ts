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

class ProductApiClass {
  private products: Product[] = [testProduct];

  constructor() {}

  getAll(req: Request, res: Response): void {
    res.json({ data: this.products });
  }

  getById(req: Request, res: Response): void {
    const { id } = req.params;
    const product = this.products.find((p) => p.id === id);
    if (product) {
      res.json({ data: product });
    } else {
      res.json({ error: "Producto no encontrado" });
    }
  }
  create(req: Request, res: Response): void {
    const product = req.body;
    console.log(req.body);
    console.log("product es: ", product);
    product.id = (this.products.length + 1).toString();
    this.products.push(product);
    res.redirect("/");
  }
  edit(req: Request, res: Response): void {
    const { id } = req.params;
    const newProduct = req.body;
    const product = this.products.find((p) => p.id === id);
    if (product) {
      product.title = newProduct.title || product.title;
      product.price = newProduct.price || product.price;
      product.thumbnail = newProduct.thumbnail || product.thumbnail;
      res.json({ data: product });
    } else {
      res.json({ error: "Producto no encontrado" });
    }
  }

  delete(req: Request, res: Response): void {
    const { id } = req.params;
    const product = this.products.find((p) => p.id === id);
    if (product) {
      this.products = this.products.filter((p) => p.id !== id);
      res.json({ msg: "Producto eliminado", id });
    } else {
      res.json({ error: "Producto no encontrado" });
    }
  }
}

const productApi = new ProductApiClass();

export default productApi;
