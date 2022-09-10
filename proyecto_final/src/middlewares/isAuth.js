export const isAuth = (req, res, next) => {
  //TODO: HAY QUE HACERLO
  let auth = true;
  if ((auth = true)) {
    next();
  } else {
    res.status(401).json({ error: "No autorizado" });
  }
};
