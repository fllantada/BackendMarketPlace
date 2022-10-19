import { Router } from "express";
import productsRouter from "./products.routes";

const mainRouter = Router();

mainRouter.use("/productos", productsRouter);

export default mainRouter;
