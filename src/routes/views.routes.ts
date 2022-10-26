import { Router } from "express";

const views = Router();

views.get("/", (req, res) => {
  res.render("home.pug");
});

export default views;
