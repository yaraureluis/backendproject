import Router from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { loginDao } from "../daos/daosLogin/index.js";
import User from "../models/modelsUsers.js";
import bcrypt from "bcrypt";

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    if (typeof password !== "string") {
      return done(null, false, { message: "Password inválido XX" });
    }
    User.findOne({ username }, async (err, user) => {
      if (err) return done(err);

      if (!user) {
        return done(null, false, { message: "Usuario no existe" });
      }
      if ((await isValidPassword(user, password)) == false) {
        return done(null, false, { message: "Contraseña incorrecta" });
      }

      return done(null, user);
    });
  })
);

async function isValidPassword(user, password) {
  return await bcrypt.compare(password, user.password);
}

export const routerLogin = new Router();

// --------------------------- LOGIN ---------------------------------------

routerLogin.get("/login", async (req, res) => {
  let response = await loginDao.getLogin(req.isAuthenticated());
  response.error ? res.status(401).json(response.error) : res.redirect("/");
});

routerLogin.post("/login", passport.authenticate("login", { failureRedirect: "/failLogin", failureMessage: true }), async (req, res) => {
  let response = await loginDao.postLogin(req.user.username, req.session);
  response.error ? res.status(400).json(response.error) : res.redirect("/");
});

routerLogin.post("/failLogin", async (req, res) => {
  let response = await loginDao.failLogin(req.session.messages);
  res.status(400).json(response);
});

// -------------------------LOGOUT-------------------------------------------
routerLogin.get("/logout", async (req, res) => {
  let response = await loginDao.getLogout(req.session);
  response.error ? res.status(400).json(response.error) : res.status(200).json(response);
});
