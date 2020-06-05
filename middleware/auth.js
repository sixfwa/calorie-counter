const jwt = require("jsonwebtoken");
const config = require("config");
/* 
    Auth middleware created to easy select which routes will require
    authentication.
*/

module.exports = function (req, res, next) {
  // Get the token from the header
  const token = req.header("x-auth-token");

  // Check if the token does not exist
  if (!token)
    return res.status(401).json({ msg: "No token, authorisation denied" });

  // Verify the token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};
