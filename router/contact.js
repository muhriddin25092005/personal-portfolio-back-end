const { Router } = require("express");
const router = Router();
const Contact = require("../models/Contact.js");

// get all contact
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (!contacts) {
      res.status(404).json({ message: "contact not found" });
      return;
    }

    res.status(200).json({ message: "success", contacts });
  } catch (error) {
    res.send(error);
  }
});

// create contact
router.post("/add", async (req, res) => {
  try {
    const { image, link } = req.body;

    if (!image || !link) {
      res.status(404).json({ message: "please complete all sections" });
      return;
    }

    const newContact = await Contact.create({ image, link });
    res.status(200).json({ message: "add new contact", contact: newContact });
  } catch (error) {
    res.send(error);
  }
});

// edit contact
router.put("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { image, link } = req.body;
    console.log(id, image, link);
    if (!image && !link) {
      res.status(404).json({ message: "this contact not found" });
      return;
    }

    const editContact = await Contact.findByIdAndUpdate(id, { image, link });
    res
      .status(200)
      .json({ message: "this contact updated", contact: editContact });
  } catch (error) {
    res.send(error);
  }
});

// delete contact
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).json({ message: "this contact not found" });
      return;
    }
    await Contact.findByIdAndRemove(id);
    res.status(200).json({ message: "this contact deleted" });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
