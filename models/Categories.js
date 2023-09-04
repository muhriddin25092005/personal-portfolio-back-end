const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
  category: [String],
});

const Categories = model("category", CategorySchema);
module.exports = Categories;
