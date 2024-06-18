const express = require("express");

const {
  jwtAuthMiddleware,
  validationMiddleware,
} = require("../utils/middlewares");
const {
  orderControllerCreate,
  orderControllerList,
  orderControllerDetail,
} = require("./controllers");
const {
  orderValidationCustomNomor,
  orderValidationCustomID,
  orderValidationCustomItemPrice,
  orderValidationCustomItemStock,
  orderValidationCustomItemQty,
  orderValidationCustomItemSubtotal,
  orderValidationCustomTotal,
} = require("./validations");
const {
  charField,
  itemsField,
  positiveIntegerField,
} = require("../utils/fields");

const orderRouter = express.Router();

const PATH_ORDER = "/orders";

orderRouter.post(
  "/",
  [
    jwtAuthMiddleware,
    validationMiddleware([
      charField("nomor").custom(orderValidationCustomNomor),
      itemsField("items"),
      charField("items.*.name"),
      charField("items.*._id").custom(orderValidationCustomID),
      positiveIntegerField("items.*.price").custom(
        orderValidationCustomItemPrice
      ),
      positiveIntegerField("items.*.stock").custom(
        orderValidationCustomItemStock
      ),
      positiveIntegerField("items.*.qty").custom(orderValidationCustomItemQty),
      positiveIntegerField("items.*.subtotal").custom(
        orderValidationCustomItemSubtotal
      ),
      positiveIntegerField("total").custom(orderValidationCustomTotal),
    ]),
  ],
  orderControllerCreate
);

orderRouter.get("/", [jwtAuthMiddleware], orderControllerList);
orderRouter.get("/:id", [jwtAuthMiddleware], orderControllerDetail);

module.exports = {
  orderRouter,
  PATH_ORDER,
};
