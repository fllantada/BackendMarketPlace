import { Router } from "express";
import productsRouter from "./products.routes";
import viewsRouter from "./views.routes";
import loginRouter from "./login.routes";
import { Request, Response } from "express";
import carritoRouter from "./carrito.routes";

const mainRouter = Router();

//check protected Routes

/* mainRouter.use("/api", adminGuard); */

mainRouter.use("/api", (req: Request, res: Response, next) => {
  console.log(req.session);
  console.log("solicitur de api");
  console.log("req.body es:", req.body);
  next();
});

mainRouter.use("/api/productos", productsRouter);
mainRouter.use("/api/carrito", carritoRouter);
mainRouter.use("/api/login", loginRouter);

mainRouter.use("/", viewsRouter);

export default mainRouter;
