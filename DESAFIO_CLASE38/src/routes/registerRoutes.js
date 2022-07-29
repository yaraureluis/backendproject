import { Router } from "express";
import path from "path";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models.js";
import registerControllers from "../controllers/registerControllers.js";
const __dirname = path.resolve();
export const register_router = new Router();

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      User.findOne({ username: username }, function (err, user) {
        if (err) {
          console.log("Error al registrar usuario: " + err);
          return done(err);
        }

        if (user) {
          console.log("Usuario existe");
          return done(null, false);
        }

        const newUser = {
          username: req.body.username,
          password: password,
        };

        User.create(newUser, (err, userWithId) => {
          if (err) {
            console.log("Error in Saving user: " + err);
            return done(err);
          }
          console.log(user);
          console.log("User Registration succesful");
          return done(null, userWithId);
        });
      });
    }
  )
);

register_router.get("/signup", registerControllers.getSignup);
register_router.post("/signup", passport.authenticate("signup", { failureRedirect: "/failsignup" }), registerControllers.postSignup);
register_router.get("/failsignup", registerControllers.getFailSignup);
