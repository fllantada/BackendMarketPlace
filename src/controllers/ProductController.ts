import { Request, Response } from "express";
import ProductApp from "../app/ProductApp";
import { Product } from "../app/Interfaces/IProduct";

//Value Object

//test product for check

//App

class ProductController {
  getAll(req: Request, res: Response): void {
    console.log("Inicio el controller getAll");
    const products = ProductApp.getAll();
    products
      .then((products) => {
        console.log("Por mandar la respuesta al servidor !!!!!");
        res.json(products);
        return;
      })
      .catch((err) => console.log(err));
  }

  getById(req: Request, res: Response): void {
    console.log("Desde el controller id, id q me llega es", req.params.id);
    const { id } = req.params;
    const product = ProductApp.getById(id);
    product
      .then((product) => {
        console.log("Desde el controller id, producto encontrado es", product);
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

    if (
      product.nombre &&
      product.precio &&
      product.stock &&
      product.descripcion &&
      product.foto
    ) {
      ProductApp.create(product);
      res.json({ msg: "Producto creado correctamente", data: product });
    } else {
      res.json({ error: "faltan datos" });
    }
  }

  edit(req: Request, res: Response): void {
    const { id } = req.params;
    const newProduct = req.body;
    console.log("ingrese al controller edit", newProduct);

    const product = ProductApp.edit(id, newProduct);
    product.then((product) => {
      if (product) {
        res.json({ msg: "Producto editado correctamente", data: product });
      } else {
        res.json({ error: "Producto no encontrado" });
      }
    });
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
