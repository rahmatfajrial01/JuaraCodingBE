const express = require("express");
const { otpControllerVerify } = require("./controllers");
const { otpValidationCustomEmail } = require("./valdations");
const { validationMiddleware } = require("../utils/middlewares");
const { emailField, charField } = require("../utils/fields");

const otpRouter = express.Router();

const PATH_OTP = "/otps";

otpRouter.post(
  "/verify",
  [
    validationMiddleware([
      emailField("email").custom(otpValidationCustomEmail),
      charField("code"),
    ]),
  ],
  otpControllerVerify
);

module.exports = {
  otpRouter,
  PATH_OTP,
};
