import { Router } from "express";

const carrito = Router();

carrito.get("/", (req, res) => {
  res.send("Get carrito");
});
carrito.get("/:id", (req, res) => {
  res.send("GEt carrito params");
});
carrito.post("/", (req, res) => {
  res.send("Post carrito");
});
carrito.put("/:id", (req, res) => {
  res.send("put carrito");
});
carrito.delete("/:id", (req, res) => {
  res.send("delete carrito");
});
export default carrito;

//get /api/productos
