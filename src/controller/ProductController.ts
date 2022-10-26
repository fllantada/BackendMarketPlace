import { Request, Response } from "express";
import ProductApp from "../app/ProductApp";

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

class ProductController {
  getAll(req: Request, res: Response): void {
    const products = ProductApp.getAll();
    res.send(products);
  }

  getById(req: Request, res: Response): void {
    const { id } = req.params;
    const product = ProductApp.getById(id);
    if (product) {
      res.json({ data: product });
    } else {
      res.json({ error: "Producto no encontrado" });
    }
  }

  create(req: Request, res: Response): void {
    const product = req.body;
    ProductApp.create(product);
    res.redirect("/productos");
  }

  edit(req: Request, res: Response): void {
    const { id } = req.params;
    const newProduct = req.body;
    const product = ProductApp.edit(id, newProduct);
    if (product) {
      res.json({ data: product });
    } else {
      res.json({ error: "Producto no encontrado" });
    }
  }

  delete(req: Request, res: Response): void {
    const { id } = req.params;
    const productDeleteResult = ProductApp.delete(id);
    if (productDeleteResult) {
      res.json({ msg: "Producto eliminado", id });
    } else {
      res.json({ error: "Producto no encontrado" });
    }
  }
}

const productsController = new ProductController();

export default productsController;
