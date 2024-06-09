// const { Product } = require("./models");
const { body } = require("express-validator");

const categoryValidationCreate = [
  body("name").exists().withMessage("Name is required"),
  body("price")
    .exists()
    .withMessage("Price is required")
    .bail()
    .isInt({ min: 1000, max: 20_000 })
    .withMessage("Price invalid"),
  body("stock")
    .exists()
    .withMessage("Stock is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Stock invalid"),
];

const categoryValidationUpdate = [
  body("name").optional().exists().withMessage("Name is required"),
  body("price")
    .optional()
    .exists()
    .withMessage("Price is required")
    .bail()
    .isInt({ min: 1000, max: 20_000 })
    .withMessage("Price invalid"),
  body("stock")
    .optional()
    .exists()
    .withMessage("Stock is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Stock invalid"),
];

module.exports = {
  categoryValidationCreate,
  categoryValidationUpdate,
};
