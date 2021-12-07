const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {

  const { token } = req.cookies;
  if (!token) {
    req.isAuth = false;
    console.log('is this getting  dfasd')

    return next();
  }
  try {
    const decodedToken = jwt.verify(token, 'supersecretkey');
    if (!decodedToken) {
      req.isAuth = false;
      console.log('is this getting hit')

      return next();
    } 
    req.isAuth = true;
    req.userId = decodedToken.userId;
    console.log('and here')
    console.log('req isAuth in middleware', req.isAuth)
    return next();
  } catch (err) {
    req.isAuth = false;
    return next()
  }
}