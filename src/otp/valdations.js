const { User } = require("../users/models");
const { Otp } = require("./models");

const otpValidationCustomEmail = async (email) => {
  const otp = await Otp.findOne({ email });
  if (!otp) {
    throw new Error("Invalid otp email");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not registered in this system");
  }
  if (user.isActive) {
    throw new Error("User has been activated");
  }
};

module.exports = {
  otpValidationCustomEmail,
};
