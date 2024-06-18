var randomstring = require("randomstring");
const { Otp } = require("./models");

const otpHelperGenerate = () => {
  return randomstring.generate({
    length: parseInt(process.env.OTP_CHARACTER_LENGTH),
    charset: "numeric",
  });
};

const otpHelperCreate = async (email) => {
  const code = otpHelperGenerate();
  await Otp.create({ email, code });
  return code;
};

module.exports = {
  otpHelperGenerate,
  otpHelperCreate,
};
