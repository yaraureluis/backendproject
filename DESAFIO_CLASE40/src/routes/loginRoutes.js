import { Router } from "express";
import path from "path";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models.js";
import loginControllers from "../controllers/login/loginControllersMongoDB.js";
const __dirname = path.resolve();
export const login_router = new Router();

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        console.log("User Not Found with username " + username);
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        console.log("Invalid Password");
        return done(null, false);
      }

      return done(null, user);
    });
  })
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

login_router.get("/login", loginControllers.getLogin);
login_router.post("/login", passport.authenticate("login", { failureRedirect: "/faillogin" }), loginControllers.postLogin);
login_router.get("/faillogin", loginControllers.getFaillogin);
login_router.get("/logout", loginControllers.getLogout);
