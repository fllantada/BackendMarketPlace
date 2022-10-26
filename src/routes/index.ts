import { Router } from "express";
import productsRouter from "./products.routes";
import viewsRouter from "./views.routes";

const mainRouter = Router();

mainRouter.use("/api/productos", productsRouter);
mainRouter.use("/", viewsRouter);
mainRouter.get("/", (req, res) => {
  res.send("OK");
});

export default mainRouter;
