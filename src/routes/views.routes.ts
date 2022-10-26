import { Router } from "express";

const views = Router();

views.get("/", (req, res) => {
  res.render("./layout/home.pug");
});

export default views;
