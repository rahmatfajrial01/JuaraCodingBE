const { validationResult, matchedData } = require("express-validator");
const _ = require("lodash");

const validationMiddleware = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    let errors = validationResult(req);
    if (errors.isEmpty()) {
      res.locals.matchedData = matchedData(req);
      return next();
    }

    errors = _.groupBy(errors.array(), (item) => item.path);
    return res.status(400).json(errors);
  };
};

module.exports = {
  validationMiddleware,
};
