const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    req.isAuth = false;
    return next();
  }
  try {
    const decodedToken = jwt.verify(token, 'supersecretkey');
    if (!decodedToken) {
      req.isAuth = false;

      return next();
    } 
    req.isAuth = true;
    req.userId = decodedToken.userId;
    return next();
  } catch (err) {
    req.isAuth = false;
    return next()
  }
}