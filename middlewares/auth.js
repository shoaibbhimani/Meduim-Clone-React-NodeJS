exports.isAuthenticated = (req, res, next) => {
  if (!req.user_id) {
    return res.status(401).send({
      error: "You Dont Have access"
    });
  }
  next();
};
