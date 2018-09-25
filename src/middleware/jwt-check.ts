const { STATUS_CODES, SECRET } = require("../constants");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["x-token"];

  if (token) {
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err) {
        return res.status(STATUS_CODES.UNAUTHORIZED).json({
          success: false,
          error: "Failed to authenticate token."
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      success: false,
      error: "No token provided."
    });
  }
};
