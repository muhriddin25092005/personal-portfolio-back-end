const { model, Schema } = require("mongoose");

const ProjectSchema = new Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  github: { type: String, required: true },
  server: { type: String, required: true },
});

const Project = model("Project", ProjectSchema);
module.exports = Project;
