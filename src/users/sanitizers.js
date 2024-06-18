const bcrypt = require("bcryptjs");

const userSanitizerCustomHashPassword = async (password) => {
  const passwordEncrypted = await bcrypt.hash(password, 10);
  return passwordEncrypted;
};

module.exports = {
  userSanitizerCustomHashPassword,
};
