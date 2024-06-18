const { charField, positiveIntegerField } = require("../utils/fields");
const { validationMiddleware } = require("../utils/middlewares");

const productValidationCreate = validationMiddleware([
  charField("name"),
  positiveIntegerField("price"),
  positiveIntegerField("stock"),
]);

const productValidationUpdate = validationMiddleware([
  charField("name", true),
  positiveIntegerField("price", true),
  positiveIntegerField("stock", true),
]);

module.exports = {
  productValidationCreate,
  productValidationUpdate,
};
