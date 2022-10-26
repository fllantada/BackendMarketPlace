import { Router } from "express";
import ProductApp from "../app/ProductApp";

const views = Router();

views.get("/", (req, res) => {
  res.render("./layout/home.pug");
});

views.get("/productos", (req, res) => {
  const products = ProductApp.getAll();
  console.log(products);
  const test = [1, 2, 4, 5, 6, 32];
  res.render("./pages/productos.pug", { productos: products });
});

views.get("/formulario", (req, res) => {
  console.log("Entre en formularios");
  res.render("./pages/formulario.pug", { title: "Formulario" });
});

export default views;
