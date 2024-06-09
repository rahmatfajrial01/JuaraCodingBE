const { exceptionHandler, Error404 } = require("../utils/errors");
const { Category } = require("./models");

const categoryControllerList = async (req, res) => {
  try {
    const result = await Category.find();
    res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const categoryControllerCreate = async (req, res) => {
  try {
    const result = await Category.create(res.locals.matchedData);
    return res.status(201).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const categoryControllerDetail = async (req, res) => {
  try {
    let result = await Category.findOne({ _id: req.params.id });
    if (!result) {
      throw new Error404();
    }
    return res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const categoryControllerUpdate = async (req, res) => {
  try {
    let result = await Category.findOne({ _id: req.params.id });
    if (!result) {
      throw new Error404();
    }

    result = await Category.findOneAndUpdate(
      { _id: req.params.id },
      res.locals.matchedData,
      { new: true }
    );
    return res.status(200).json(result);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

const categoryControllerDelete = async (req, res) => {
  try {
    let result = await Category.findOne({ _id: req.params.id });
    if (!result) {
      throw new Error404();
    }

    await Category.findOneAndDelete({ _id: req.params.id });
    res.status(204).json(null);
  } catch (error) {
    return exceptionHandler(error, res);
  }
};

module.exports = {
  categoryControllerList,
  categoryControllerCreate,
  categoryControllerUpdate,
  categoryControllerDelete,
  categoryControllerDetail,
};
