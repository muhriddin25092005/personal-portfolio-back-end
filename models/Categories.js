const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
  category: { type: String, required: true },
});

const Categories = model("category", CategorySchema);
module.exports = Categories;
