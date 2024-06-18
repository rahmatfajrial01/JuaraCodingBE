const mongoose = require("mongoose");

const userObject = {
  firstName: { type: String, required: false, default: "" },
  lastName: { type: String, required: false, default: "" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  isDelete: { type: Boolean, default: false },
};

const userSchema = new mongoose.Schema(userObject, {
  versionKey: false,
  timestamps: true,
});

const User = new mongoose.model("User", userSchema);

module.exports = {
  User,
  userObject,
  userSchema,
};
