import express from "express";
import { Express, Request, Response } from "express";
import mainRouter from "../routes";
import path from "path";
import { createServer } from "http";
import User from "../auth/isAdmin";
import session from "express-session";

const sessionConfig = session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: false,
  },
});

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionConfig);

//user Status for protected Routes

User.setRoleType("User");

// Static files

const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));

// engine

app.set("view engine", "pug");

const viewsPath = path.resolve(__dirname, "../views");
app.set("views", viewsPath);

app.use("/", mainRouter);

app.use(function (err: Error, req: Request, res: Response, next: Function) {
  res.status(500).send({ msg: "Se te rompio todo mira ->", err: err.message });
});

export default createServer(app);
