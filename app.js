const express = require("express");
const { PATH_PRODUCT, productRouter } = require("./src/products/routers");
const { PATH_CATEGORY, categoryRouter } = require("./src/categories/routers");
const { PATH_USER, userRouter } = require("./src/users/routers");
const { PATH_ORDER, orderRouter } = require("./src/orders/routers");
const { connectDB } = require("./src/utils/databases");
const { PATH_OTP, otpRouter } = require("./src/otp/routers");

const app = express();

connectDB();

app.use(express.json());

app.use(PATH_PRODUCT, productRouter);
app.use(PATH_CATEGORY, categoryRouter);
app.use(PATH_USER, userRouter);
app.use(PATH_ORDER, orderRouter);
app.use(PATH_OTP, otpRouter);


module.exports = { app };
