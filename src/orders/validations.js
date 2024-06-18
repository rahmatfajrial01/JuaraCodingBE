const { Order } = require("./models");
const { Product } = require("../products/models");
const { Error403 } = require("../utils/errors");

const orderValidationNonFieldOwnership = async (res) => {
  for (let item of res.locals.matchedData.items) {
    const product = await Product.findOne({
      _id: item._id,
      owner: res.locals.user._id,
    });
    if (!product) {
      throw new Error403();
    }
  }
};

const orderValidationCustomNomor = async (nomor) => {
  const order = await Order.findOne({ nomor });
  if (order) {
    throw new Error("Order number already exists");
  }
};

const orderValidationCustomID = async (_id) => {
  const product = await Product.findOne({ _id, isDelete: false });
  if (!product) {
    throw new Error("Product not available.");
  }
};

const orderValidationCustomItemPrice = async (price, { req, path }) => {
  const index = Number(path.replace(/\D/g, ""));
  const product = await Product.findOne({ _id: req.body.items[index]._id });
  if (product && product.price !== price) {
    throw new Error("Price sudah diubah");
  }
};

const orderValidationCustomItemStock = async (stock, { req, path }) => {
  const index = Number(path.replace(/\D/g, ""));
  const product = await Product.findOne({ _id: req.body.items[index]._id });
  if (product && product.stock !== stock) {
    throw new Error("Stock sudah diubah");
  }
};

const orderValidationCustomItemQty = async (qty, { req, path }) => {
  const index = Number(path.replace(/\D/g, ""));
  const product = await Product.findOne({ _id: req.body.items[index]._id });
  if (product) {
    if (qty > product.stock) {
      throw new Error("Stock not enought");
    }
  }
};

const orderValidationCustomItemSubtotal = async (subtotal, { req, path }) => {
  const index = Number(path.replace(/\D/g, ""));
  const product = await Product.findOne({ _id: req.body.items[index]._id });
  if (product) {
    const calculateSubtotal = product.price * req.body.items[index].qty;
    if (calculateSubtotal !== subtotal) {
      throw new Error("Invalid subtotal");
    }
  }
};

const orderValidationCustomTotal = async (total, { req }) => {
  const items = req.body.items;
  let totalFromSubtotal = 0;
  for (let item of items) {
    totalFromSubtotal += item.subtotal;
  }

  if (total !== totalFromSubtotal) {
    throw new Error("Total tidak sesuai");
  }
};

module.exports = {
  orderValidationCustomNomor,
  orderValidationCustomID,
  orderValidationCustomItemPrice,
  orderValidationCustomItemStock,
  orderValidationCustomItemQty,
  orderValidationCustomItemSubtotal,
  orderValidationCustomTotal,
  orderValidationNonFieldOwnership,
};
