const { validationResult, matchedData } = require("express-validator");
const _ = require("lodash");
const { Error401, exceptionHandler } = require("./errors");
const jwt = require("jsonwebtoken");
const { User } = require("../users/models");

const validationMiddleware = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    let errors = validationResult(req);
    if (errors.isEmpty()) {
      res.locals.matchedData = matchedData(req);
      return next();
    }

    errors = _.groupBy(errors.array(), (item) => item.path);
    return res.status(400).json(errors);
  };
};

const jwtAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      throw new Error401("Token is required for authentication");
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({
      email: decode.email,
      isActive: true,
      isDelete: false,
    });

    if (!user) {
      throw new Error401("Invalid user credential");
    }

    if (!user.isActive) {
      throw new Error401("User inactive");
    }

    res.locals.user = user;
  } catch (error) {
    console.log(error);
    return exceptionHandler(error, res);
  }
  return next();
};

module.exports = {
  validationMiddleware,
  jwtAuthMiddleware,
};
