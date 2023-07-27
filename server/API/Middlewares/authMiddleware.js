const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    if (res.locals.userData) {
      // If userData already exists in res.locals, no need to reprocess the token.
      req.userData = res.locals.userData;
      return next();
    }

    const userToken = req.headers["authorization"]?.split(" ")[1];
    if (!userToken) {
      return res.status(401).json({ message: "You are not authenticated!" });
    }

    const decodedToken = jwt.verify(JSON.parse(userToken), "secretKey");
    const userData = {
      email: decodedToken?.email,
      userId: decodedToken.userId,
    };
    res.locals.userData = userData;
    req.userData = userData;
    next();
  } catch (err) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};
