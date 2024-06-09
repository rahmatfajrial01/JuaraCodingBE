const { default: mongoose } = require("mongoose");

const categoryObject = {
  name: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  stock: { type: Number, required: true, min: 1 },
};

const categorySchema = new mongoose.Schema(categoryObject, {
  versionKey: false,
  timestamps: true,
});

const Category = new mongoose.model("Category", categorySchema);

module.exports = {
  Category,
  categoryObject,
  categorySchema,
};
