const { exceptionHandler, Error404 } = require("../utils/errors");
const { Product } = require("./models");

const productControllerList = async (req, res) => {
  try {
    const result = await Product.find();
    res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const productControllerCreate = async (req, res) => {
  try {
    const result = await Product.create(res.locals.matchedData);
    return res.status(201).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const productControllerDetail = async (req, res) => {
  try {
    let result = await Product.findOne({ _id: req.params.id });
    if (!result) {
      throw new Error404();
    }
    return res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const productControllerUpdate = async (req, res) => {
  try {
    let result = await Product.findOne({ _id: req.params.id });
    if (!result) {
      throw new Error404();
    }

    result = await Product.findOneAndUpdate(
      { _id: req.params.id },
      res.locals.matchedData,
      { new: true }
    );
    return res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const productControllerDelete = async (req, res) => {
  try {
    let result = await Product.findOne({ _id: req.params.id });
    if (!result) {
      throw new Error404();
    }

    await Product.findOneAndDelete({ _id: req.params.id });
    res.status(204).json(null);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

module.exports = {
  productControllerList,
  productControllerCreate,
  productControllerUpdate,
  productControllerDelete,
  productControllerDetail,
};
