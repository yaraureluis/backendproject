export const isAdmin = (req, res, next) => {
  let adm = true;
  if ((adm = true)) {
    next();
  } else {
    res.status(401).json({ error: "No autorizado" });
  }
};
