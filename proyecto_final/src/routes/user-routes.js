import { Router } from "express";
import { usersController } from "../controllers/users-controller.js";
// import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
// import User from "../models/user-model.js";
// import { v4 as uuidv4 } from "uuid";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();
export const usersRouter = new Router();
// passport.use(
//   "register",
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passReqToCallback: true,
//     },
//     (req, username, password, done) => {
//       User.findOne({ email: username }, function (err, user) {
//         if (err) {
//           console.log("Error al registrar usuario  >>>> ", err);
//           return done(err);
//         }

//         if (user) {
//           return done(null, false, { message: "Usuario existe" });
//         }

//         if (!req.body.name || !req.body.lastname || !req.body.phone || !req.body.image) {
//           return done(null, false, { message: "Los campos name, lastame, phone, image son requeridos" });
//         }

//         // ##########################################################################################################################################
//         //TODO: AGREGUÉ EL ID PERO DEBO CREAR EN SERVICIO LA PARTE DE USER, PARA CREAR EL CARRITO CUANDO SE REGISTRE EL USUARIO, Y ASIGNARLE ESTE ID
//         // ##########################################################################################################################################

//         const newUser = {
//           email: req.body.email,
//           password: password,
//           name: req.body.name,
//           lastname: req.body.lastname,
//           phone: req.body.phone,
//           image: req.body.image,
//           id: uuidv4(),
//         };

//         User.create(newUser, (err, user) => {
//           if (err) {
//             console.log("Error in Saving user: ", err);
//             return done(err);
//           }

//           console.log("User Registration succesful");
//           const token = jwt.sign({ username: username }, process.env.PRIVATE_WORD_JWT, {
//             expiresIn: 86400, // expires in 24 hours
//           });
//           req.token = token;
//           return done(null, user);
//         });
//       });
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user._id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id, done);
// });

usersRouter.post("/", usersController.createUser);
// usersRouter.post("/", passport.authenticate("register", { failureRedirect: "/api/users/failregister", failureMessage: true }), usersController.createUser);
usersRouter.post("/failregister", usersController.failRegister);
