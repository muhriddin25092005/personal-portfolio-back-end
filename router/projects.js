const { Router } = require("express");
const router = Router();
const Project = require("../models/Project.js");
const path = require("path");

// get all project
router.get("/", async (req, res) => {
  try {
    const allProject = await Project.find();
    res.status(200).json({ message: "success", allProject });
  } catch (error) {
    res.send(error);
  }
});

// create one project
router.post("/add", async (req, res) => {
  try {
    const { image, title, description, category, github, server } = req.body;

    if (!title || !description || !category || !github || !server) {
      res.json({ message: "please complete all sections" });
      return;
    }

    const newProject = await Project.create({
      image: image,
      title: title,
      description: description,
      category: category,
      github: github,
      server: server,
    });

    res.status(201).json({ message: "created new project", newProject });
  } catch (error) {
    res.send(error);
  }
});

// get single project
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const singleProject = await Project.findById(id);
    if (singleProject) {
      res.status(200).json({ message: "success", singleProject });
    } else {
      res.status(404).json({ message: "project not found" });
    }
  } catch (error) {
    res.send(error);
  }
});

// update one project
router.put("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "this project updated", updatedProject });
  } catch (error) {
    res.send(error);
  }
});

// delete project
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Project.findByIdAndRemove(id);
    res.status(200).json({ message: "this project deleted" });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
