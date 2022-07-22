import Router from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { registerDao } from "../daos/daosRegister/index.js";
import User from "../models/modelsUsers.js";
import bcrypt from "bcrypt";
import logger from "../../logger/logger.js";

passport.use(
  "register",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      if (typeof password !== "string") {
        return done(null, false, { message: "Password inválido" });
      }
      User.findOne({ username: username }, async function (err, user) {
        if (err) {
          logger.error("Error al registrar usuario: " + err);
          return done(err);
        }

        if (user) {
          return done(null, false, { message: "Usuario existe" });
        }

        let encrypted_password = await bcrypt.hash(password, 9);
        const newUser = {
          username: req.body.username,
          password: encrypted_password,
          name: req.body.name,
          address: req.body.address,
          age: req.body.age,
          phone: req.body.phone,
          avatar: req.body.avatar,
        };

        User.create(newUser, (err, userWithId) => {
          if (err) {
            logger.error("Error in Saving user: " + err);
            return done(err);
          }
          logger.info("User Registration succesful:", userWithId.username);
          return done(null, userWithId);
        });
      });
    }
  )
);

export const routerRegister = new Router();

// --------------------------- REGISTRO ---------------------------------------

routerRegister.post("/registro", passport.authenticate("register", { failureRedirect: "/failRegister", failureMessage: true }), async (req, res) => {
  let response = await registerDao.postRegister(req.body, req.user._id);
  response.error ? res.status(400).json(response.error) : res.redirect("/");
});

routerRegister.post("/failRegister", async (req, res) => {
  let response = await registerDao.failRegister(req.session.messages);
  res.status(400).json(response);
});
// ----------------------- FIN REGISTRO ---------------------------------------
