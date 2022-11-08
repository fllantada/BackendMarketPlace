import { Router } from "express";
import carritoController from "../controllers/CarritoController";

const carrito = Router();

carrito.post("/", carritoController.create.bind(carritoController));

carrito.delete(
  "/:id_carrito",
  carritoController.delete.bind(carritoController)
);

carrito.post(
  "/:id_carrito/productos/:id_producto",
  carritoController.addProduct.bind(carritoController)
);
carrito.delete(
  "/:id_carrito/productos/:id_producto",
  carritoController.removeProduct.bind(carritoController)
);

carrito.get(
  "/:id_carrito/productos",
  carritoController.getProducts.bind(carritoController)
);

carrito.get("/", carritoController.getAll.bind(carritoController));
export default carrito;

//get /api/productos
