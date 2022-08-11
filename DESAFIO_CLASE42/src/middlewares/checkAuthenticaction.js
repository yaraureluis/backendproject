export const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.session.username = req.body.username;
    console.log("username en autenticación", req.session.username);
    next();
  } else {
    res.redirect("/login");
  }
};
