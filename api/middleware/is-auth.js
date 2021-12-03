const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  console.log('hi there')
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(" ")[1];
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
  }catch (err) {
    req.isAuth = false;
    return next()
  }
}