import { Router } from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserLoginModel from "../models/user-model.js";
import { loginController } from "../controllers/login-controller.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const loginRouter = new Router();

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      UserLoginModel.findOne({ email: username }, (err, user) => {
        if (err) return done(err);

        if (!user) {
          return done(null, false, { message: `No se encuenta un usuario con el nombre ${username}` });
        }

        if (!isValidPassword(user, password)) {
          return done(null, false, { message: "Contraseña invalida" });
        }

        const token = jwt.sign({ username: username }, process.env.PRIVATE_WORD_JWT, {
          expiresIn: 86400, // expires in 24 hours
        });
        req.token = token;

        return done(null, user);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

function isValidPassword(user, password) {
  return password == user.password;
}

loginRouter.post("/", passport.authenticate("login", { failureRedirect: "/login/faillogin", failureMessage: true }), loginController.postLogin);
loginRouter.post("/faillogin", loginController.faillogin);
// loginRouter.get("/logout", loginController.getLogout);
