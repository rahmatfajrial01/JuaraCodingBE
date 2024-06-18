const jwt = require("jsonwebtoken");

const utilHelperMakeJWT = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRED_IN,
  });
};

module.exports = {
  utilHelperMakeJWT,
};
