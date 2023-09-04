const { Router } = require("express");
const router = Router();
const Skills = require("../models/Skills.js");
const path = require("path");

// get all skills
router.get("/", async (req, res) => {
  try {
    const allSkills = await Skills.find();
    res.status(200).json({
      message: "success",
      allSkills,
    });
  } catch (error) {
    res.send(error);
  }
});

// create skill
router.post("/add", async (req, res) => {
  try {
    const image = req.body.image;
    const newSkill = await Skills.create({ image });
    res.status(200).json({ message: "success", newSkill });
  } catch (error) {
    res.send(error);
  }
});

// edit skill
router.put("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { image } = req.body;
    const skill = await Skills.findByIdAndUpdate(id, { image }, { new: true });
    res.status(200).json({ message: "this skill updated", skill });
  } catch (error) {
    res.send(error);
  }
});

// delete skill
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Skills.findByIdAndRemove(id);
    res.status(200).json({ message: "this skill deleted" });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
