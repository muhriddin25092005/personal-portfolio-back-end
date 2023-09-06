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

    if (!category) {
      res.status(404).json({ message: "this category not found" });
      return;
    }

    const newCategory = await Categories.create({ category });
    res.status(200).json({ message: "success", category: newCategory });
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

    res.status(200).json({ message: "success", category: categoryProject });
  } catch (error) {
    res.send(error);
  }
});

// delete category
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(404).json({ message: "not found" });
    }

    await Categories.findByIdAndRemove(id);
    res.status(200).json({ message: "this category deleted" });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
