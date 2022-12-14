import { Router } from "express";
import ProductApp from "../app/ProductApp";

const views = Router();

views.get("/", (req, res) => {
  const products = ProductApp.getAll();
  res.render("./pages/homePage.pug", { title: "Home", productos: products });
});

views.get("/chat", (req, res) => {
  const products = ProductApp.getAll();
  res.render("./pages/homePageTp5.pug", { title: "Home", productos: products });
});

views.get("/productos", (req, res) => {
  const products = ProductApp.getAll();

  const test = [1, 2, 4, 5, 6, 32];
  res.render("./pages/productos.pug", { productos: products });
});

views.get("/formulario", (req, res) => {
  const products = ProductApp.getAll();
  res.render("./pages/formulario.pug", {
    title: "Formulario",
    productos: products,
  });
});

views.get("/login", (req, res) => {
  res.render("./pages/loginPage.pug", { title: "Login" });
});

export default views;
