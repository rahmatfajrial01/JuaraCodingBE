const express = require("express");
const {
  categoryControllerList,
  categoryControllerDetail,
  categoryControllerCreate,
  categoryControllerUpdate,
  categoryControllerDelete,
} = require("./controllers");

const { validationMiddleware } = require("../utils/middlewares");
const {
  categoryValidationCreate,
  categoryValidationUpdate,
} = require("./validations");

const categoryRouter = express.Router();

const PATH_CATEGORY = "/categories";

categoryRouter.get("/", categoryControllerList);
categoryRouter.get("/:id", categoryControllerDetail);
categoryRouter.post(
  "/",
  [validationMiddleware(categoryValidationCreate)],
  categoryControllerCreate
);
categoryRouter.put(
  "/:id",
  [validationMiddleware(categoryValidationUpdate)],
  categoryControllerUpdate
);
categoryRouter.delete("/:id", categoryControllerDelete);

module.exports = {
  categoryRouter,
  PATH_CATEGORY,
};
