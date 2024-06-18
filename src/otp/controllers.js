const { User } = require("../users/models");
const { Error401, exceptionHandler } = require("../utils/errors");
const { utilHelperMakeJWT } = require("../utils/helpers");
const { Otp } = require("./models");

const otpControllerVerify = async (req, res) => {
  try {
    const result = await Otp.findOne({ ...res.locals.mathedData });
    if (!result) {
      throw new Error401("Activate user is failed");
    }

    const user = await User.findOneAndUpdate(
      { email: result.email },
      { isActive: true }
    );

    const payload = {
      email: user.email,
    };

    const token = utilHelperMakeJWT(payload);

    return res.status(200).json({ token });
    return;
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

module.exports = {
  otpControllerVerify,
};
