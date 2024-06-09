const express = require("express");
const {
  productControllerList,
  productControllerDetail,
  productControllerCreate,
  productControllerUpdate,
  productControllerDelete,
} = require("./controllers");

const { validationMiddleware } = require("../utils/middlewares");
const {
  productValidationCreate,
  productValidationUpdate,
} = require("./validations");

const productRouter = express.Router();

const PATH_PRODUCT = "/products";

productRouter.get("/", productControllerList);
productRouter.get("/:id", productControllerDetail);
productRouter.post(
  "/",
  [validationMiddleware(productValidationCreate)],
  productControllerCreate
);
productRouter.put(
  "/:id",
  [validationMiddleware(productValidationUpdate)],
  productControllerUpdate
);
productRouter.delete("/:id", productControllerDelete);

module.exports = {
  productRouter,
  PATH_PRODUCT,
};
