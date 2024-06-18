const filterSearch = (req, model) => {
  const { field, value } = req.query;

  if (!field || !value) {
    return model.find();
  }

  return model.find({
    [field]: { $regex: ".*" + value + ".*", $options: "i" },
  });
};

module.exports = {
  filterSearch,
};
