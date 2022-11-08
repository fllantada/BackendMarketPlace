import { Request, Response } from "express";
import CarritoApp from "../app/CarritoApp";
import { Carrito } from "../app/Interfaces/ICarrito";
import { Product } from "../app/Interfaces/IProduct";

type Error = { Error: string };
class CarritoController {
  constructor() {}

  create(req: Request, res: Response) {
    const carrito = CarritoApp.create();
    res.send(carrito);
  }
  delete(req: Request, res: Response) {
    const { id_carrito } = req.params;
    const deleted = CarritoApp.delete(id_carrito);
    res.send(deleted);
  }
  async addProduct(req: Request, res: Response) {
    const { id_carrito } = req.params;
    const { id_producto } = req.params;
    console.log(id_carrito, id_producto);
    const carrito: Carrito | Error = await CarritoApp.addProduct(
      id_carrito,
      id_producto
    );
    res.send(carrito);
  }
  async removeProduct(req: Request, res: Response) {
    const { id_carrito } = req.params;
    const { id_producto } = req.params;
    const carrito: Carrito | Error = await CarritoApp.removeProduct(
      id_carrito,
      id_producto
    );
    res.send(carrito);
  }
  async getProducts(req: Request, res: Response) {
    const { id_carrito } = req.params;
    const products: Product[] = await CarritoApp.getProducts(id_carrito);
    if (products.length > 0) {
      res.send(products);
    } else {
      res.send({ Error: "Carrito sin Productos" });
    }
  }
}

const carritoController = new CarritoController();

export default carritoController;
