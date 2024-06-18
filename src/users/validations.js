const { User } = require("./models");
const bcrypt = require("bcryptjs");

const userValidationCustomUniqueEmail = async (email) => {
  const user = await User.findOne({ email });
  if (user) {
    throw new Error("Email has been registered.");
  }
};

const userValidationCustomEmailNotRegitered = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email not registered.");
  }

  if (!user.isActive) {
    throw new Error("Email not activate.");
  }
};

const userValidationCustomPasswordCheck = async (value, { req }) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!(await bcrypt.compare(value, user.password))) {
      return Promise.reject("Invalid password");
    }

    return value;
  } catch (error) {
    throw new Error("Invalid password");
  }
};

module.exports = {
  userValidationCustomUniqueEmail,
  userValidationCustomEmailNotRegitered,
  userValidationCustomPasswordCheck,
};
