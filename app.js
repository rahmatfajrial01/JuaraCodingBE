const express = require("express");
const { PATH_PRODUCT, productRouter } = require("./src/products/routers");
const { PATH_CATEGORY, categoryRouter } = require("./src/categories/routers");
const { connectDB } = require("./src/utils/databases");

const app = express();

connectDB();

app.use(express.json());

app.use(PATH_PRODUCT, productRouter);
app.use(PATH_CATEGORY, categoryRouter);
module.exports = { app };
