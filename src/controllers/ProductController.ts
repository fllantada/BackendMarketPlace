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
    console.log("Inicio el controller getAll");
    const products = ProductApp.getAll();
    products
      .then((products) => {
        res.json(products);
      })
      .catch((err) => console.log(err));
  }

  getById(req: Request, res: Response): void {
    console.log("Desde el controller id, id q me llega es", req.params.id);
    const { id } = req.params;
    const product = ProductApp.getById(id);
    product
      .then((product) => {
        if (product) {
          res.json({ data: product });
        } else {
          res.json({ error: "Producto no encontrado" });
        }
      })
      .catch((err) => console.log(err));
  }

  create(req: Request, res: Response): void {
    const product: Product = req.body;

    if (product.title && product.price && product.thumbnail) {
      ProductApp.create(product);
      res.json({ msg: "Producto creado correctamente", data: product });
    } else {
      res.json({ error: "faltan datos" });
    }
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
