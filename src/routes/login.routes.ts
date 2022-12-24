//login
import { Router, Request, Response, NextFunction } from "express";
import { Guard } from "../auth/Guard";
import passport from "passport";

//register

const loginRouter = Router();
loginRouter.post("signup", (req: Request, res: Response, next : NextFunction) => {

passport.authenticate("signup", (err, user, info) => {

});

loginRouter.post("/login", (req: Request, res: Response) => {
  //obtengo credenciales del bodyuser
  let credentials: { user: string; password: string } = {
    user: req.body.user ? req.body.user : "",
    password: req.body.password ? req.body.password : "",
  };

  //verifico si esas credenciales
  if (Guard.isAdmin(credentials) && req.session) {
    //si esta ok guardo en session
    req.session.user = credentials;
    console.log("por retornar usuario logeado como admin");
    return res.status(200).send("/");
  }
  //sino retorno error

  return res.status(401).send("Usuario o contraseña incorrectos");
});

loginRouter.post("/register", (req: Request, res: Response) => {
  //obtengo credenciales del bodyuser
  let credentials: { user: string; password: string } = {
    user: req.body.user ? req.body.user : "",
    password: req.body.password ? req.body.password : "",
  };

  //verifico si ya existe el usuario
  //si no existe lo creo
  //if userManager.exists(credentials.user) {
  //userManager.create(credentials);

  //si existe retorno error
});

loginRouter.get("/datos", (req: Request, res: Response) => {});

loginRouter.get("/logout", (req: Request, res: Response) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return console.log(err);
      }
      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  }
});

export default loginRouter;
