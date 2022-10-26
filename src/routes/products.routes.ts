import { Router } from "express";
import productsController from "../controller/ProductController";

const productos = Router();

productos.get("/", productsController.getAll.bind(productsController));
productos.get("/:id", productsController.getById.bind(productsController));

productos.post("/", productsController.create.bind(productsController));
productos.put("/:id", productsController.edit.bind(productsController));
productos.delete("/:id", productsController.delete.bind(productsController));

export default productos;

//get /api/productos
