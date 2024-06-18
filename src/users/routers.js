const express = require("express");
const {
  userControllerRegiter,
  userControllerSignIn,
} = require("./controllers");
const {
  userValidationCustomUniqueEmail,
  userValidationCustomEmailNotRegitered,
  userValidationCustomPasswordCheck,
} = require("./validations");
const { emailField, passwordField } = require("../utils/fields");
const { userSanitizerCustomHashPassword } = require("./sanitizers");
const { validationMiddleware } = require("../utils/middlewares");

const userRouter = express.Router();

const PATH_USER = "/users";

userRouter.post(
  "/",
  [
    validationMiddleware([
      emailField("email").custom(userValidationCustomUniqueEmail),
      passwordField("password").customSanitizer(
        userSanitizerCustomHashPassword
      ),
    ]),
  ],
  userControllerRegiter
);

userRouter.post(
  "/signin",
  [
    validationMiddleware([
      emailField("email").custom(userValidationCustomEmailNotRegitered),
      passwordField("password").custom(userValidationCustomPasswordCheck),
    ]),
  ],
  userControllerSignIn
);

module.exports = {
  PATH_USER,
  userRouter,
};
