import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../models/user";

console.log("find user model");

const strategyOptions = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

const login = async (
  req: Request,
  username: string,
  password: string,
  done: any
) => {
  console.log("Login desde passport");
  const user = await UserModel.find({ username, password });

  if (user) {
    done(null, user);
  }
  done(null, false);
};
const signup = async (
  req: Request,
  username: string,
  password: string,
  done: any
) => {
  console.log("Signup desde passport");
  try {
    await UserModel.create({ username, password });
  } catch (err) {
    console.log(err);
    return done(null, false, { message: "Error al crear usuario" });
  }
};

passport.serializeUser((user: any, done: any) => {
  console.log("Se ejecuta serializeUser");
  done(null, user);
});

passport.deserializeUser((user: any, done: any) => {
  console.log("Se ejecuta deserializeUser");
  done(null, user);
});

export const loginFunc = new LocalStrategy(strategyOptions, login);

export const signUpFunc = new LocalStrategy(strategyOptions, signup);
