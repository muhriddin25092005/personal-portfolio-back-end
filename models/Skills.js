const { model, Schema } = require("mongoose");

const SkillsSchema = new Schema({
  image: { type: String, required: true },
});

const Skills = model("skill", SkillsSchema);
module.exports = Skills;
