const { Router } = require("express");
const router = Router();
const Project = require("../models/Project");
const Categories = require("../models/Categories");

// get all category
router.get("/", async (req, res) => {
  try {
    const allCategories = await Categories.find();
    res.status(200).json({ message: "success", allCategories });
  } catch (error) {
    res.send(error);
  }
});

// create category
router.post("/add", async (req, res) => {
  try {
    const { category } = req.body;

    const categoriesDoc = await Categories.findOne({}); // Biz yagona hujjatni olamiz
    if (!categoriesDoc) {
      return res.status(404).json({ message: "Categories not found." });
    }

    categoriesDoc.category.push(category);
    await categoriesDoc.save();

    res.status(200).json({ message: "Category added!", data: categoriesDoc });
  } catch (error) {
    res.send(error);
  }
});

// get single category
router.get("/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const categoryProject = await Project.find({ category: name });
    if (!categoryProject) {
      res.status(404).json({ message: "project not found" });
      return;
    }

    res.status(200).json({ message: "success", categoryProject });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
