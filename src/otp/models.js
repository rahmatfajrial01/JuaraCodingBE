const { default: mongoose } = require("mongoose");

const otpObject = {
  email: { type: String, required: true, unique: true },
  code: { type: String, required: true },
};

const otpSchema = new mongoose.Schema(otpObject, {
  versionKey: false,
  timestamps: true,
});

const Otp = new mongoose.model("Otp", otpSchema);

module.exports = {
  Otp,
  otpObject,
  otpSchema,
};
