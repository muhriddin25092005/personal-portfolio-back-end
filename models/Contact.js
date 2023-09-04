const { Schema, model } = require("mongoose");

const ContactSchema = new Schema({
  image: { type: String, required: true },
  link: { type: String, required: true },
});

const Contact = model("contact", ContactSchema);
module.exports = Contact;
