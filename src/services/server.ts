import express from "express";
import { Express, Request, Response } from "express";
import mainRouter from "../routes";
import path from "path";

const app: Express = express();

app.use(express.json());

const publicPath = path.resolve(__dirname, "../public");

app.use(express.static(publicPath));

app.use("/api", mainRouter);

app.use(function (err: Error, req: Request, res: Response, next: Function) {
  res.status(500).send({ msg: "Se te rompio todo mira ->", err: err.message });
});

export default app;
