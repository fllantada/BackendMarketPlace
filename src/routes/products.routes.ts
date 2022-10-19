import { Router } from "express";
import productApi from "../controller/ProductApiClass";

const productos = Router();

productos.get("/", productApi.getAll.bind(productApi));
productos.get("/:id", productApi.getById.bind(productApi));
productos.post("/", productApi.create.bind(productApi));
productos.put("/:id", productApi.edit.bind(productApi));
productos.delete("/:id", productApi.delete.bind(productApi));

export default productos;

//get /api/productos
