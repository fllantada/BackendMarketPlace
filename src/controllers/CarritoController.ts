import { Request, Response } from "express";
import CarritoApp from "../app/CarritoApp";

class CarritoController {
  constructor() {}

  getCarrito() {}
  create(req: Request, res: Response) {
    const carrito = CarritoApp.create();
    res.send(carrito);
  }
}

const carritoController = new CarritoController();

export default carritoController;
