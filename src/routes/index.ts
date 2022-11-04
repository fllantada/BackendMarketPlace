import { Router } from "express";
import productsRouter from "./products.routes";
import viewsRouter from "./views.routes";
import { Request, Response } from "express";
import adminGuard from "../auth/adminGuard";

const mainRouter = Router();

//check protected Routes
mainRouter.use("/api", adminGuard);

mainRouter.use("/api/productos", productsRouter);
mainRouter.use("api/carrito", () => {});
mainRouter.use("api/login", (req: Request, res: Response) => {
  res.send("login");
});
mainRouter.use("/", viewsRouter);

export default mainRouter;
