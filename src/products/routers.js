const express = require("express");
const {
  productControllerList,
  productControllerDetail,
  productControllerCreate,
  productControllerUpdate,
  productControllerDelete,
} = require("./controllers");
const {
  jwtAuthMiddleware,
  validationMiddleware,
} = require("../utils/middlewares");

const { charField, positiveIntegerField } = require("../utils/fields");

const productRouter = express.Router();
const PATH_PRODUCT = "/products";

productRouter.get("/", [jwtAuthMiddleware], productControllerList);

productRouter.get("/:id", [jwtAuthMiddleware], productControllerDetail);

productRouter.post(
  "/",
  [
    jwtAuthMiddleware,
    validationMiddleware([
      charField("name"),
      positiveIntegerField("price"),
      positiveIntegerField("stock"),
    ]),
  ],
  productControllerCreate
);

productRouter.put(
  "/:id",
  [
    jwtAuthMiddleware,
    validationMiddleware([
      charField("name", true),
      positiveIntegerField("price", true),
      positiveIntegerField("stock", true),
    ]),
  ],
  productControllerUpdate
);

productRouter.delete("/:id", [jwtAuthMiddleware], productControllerDelete);

module.exports = {
  productRouter,
  PATH_PRODUCT,
};
