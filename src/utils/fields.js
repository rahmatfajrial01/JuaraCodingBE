const { body } = require("express-validator");

const field = (name, optional = false) => {
  const f = body(name);
  f.exists().bail();
  f.notEmpty().bail();

  if (optional) {
    f.optional();
  }

  return f;
};

const charField = (name, optional = false, options = null) => {
  const f = field(name, optional);
  f.isString().bail();
  f.isLength(options || {}).bail();
  return f;
};

const emailField = (name, optional = false) => {
  const f = charField(name, optional);
  f.isEmail().bail();
  return f;
};

const passwordField = (name, optional = false) => {
  const f = charField(name, optional);
  f.isStrongPassword().bail().withMessage("");
  return f;
};

const itemsField = (name, optional = false, options = { min: 1, max: 100 }) => {
  const f = field(name, optional);
  f.isArray(options).bail();
  return f;
};

const integerField = (name, optional = false, options = {}) => {
  const f = field(name, optional);
  f.isNumeric().bail();
  f.isInt(options).bail();
  return f;
};

const positiveSmallIntegerField = (name, optional = false) => {
  return integerField(name, optional, { min: 0, max: 225 });
};

const positiveIntegerField = (name, optional = false) => {
  return integerField(name, optional, { min: 0, max: 2147483647 });
};

const positivebBigIntegerField = (name, optional = false) => {
  return integerField(name, optional, { min: 0, max: Math.pow(253, 53) - 1 });
};

module.exports = {
  positivebBigIntegerField,
  positiveIntegerField,
  positiveSmallIntegerField,
  integerField,
  itemsField,
  emailField,
  passwordField,
  charField,
  field,
};
