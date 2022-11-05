import { Router } from "express";
import productsRouter from "./products.routes";
import viewsRouter from "./views.routes";
import { Request, Response } from "express";
import adminGuard from "../auth/adminGuard";
import user from "../auth/isAdmin";
import carritoRouter from "./carrito.routes";

const mainRouter = Router();

//check protected Routes
mainRouter.use("/api", adminGuard);

mainRouter.use("/api/productos", productsRouter);
mainRouter.use("/api/carrito", carritoRouter);
mainRouter.use("/api/login", (req: Request, res: Response) => {
  user.setRoleType("Admin");
  res.send("Listo estas logeado , para deslogearte entra en /api/logout");
});
mainRouter.use("/api/logout", (req: Request, res: Response) => {
  user.setRoleType("User");
  res.send("Listo estas deslogeado , para logearte entra en /api/login");
});
mainRouter.use("/", viewsRouter);

export default mainRouter;
