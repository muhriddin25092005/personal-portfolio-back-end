const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cors = require("cors");

// file require
const projects = require("./router/projects.js");
const skills = require("./router/skills.js");
const category = require("./router/category.js");
const contact = require("./router/contact.js");

// config
dotenv.config();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(cors());

// api
app.use("/api/projects", projects);
app.use("/api/skills", skills);
app.use("/api/category", category);
app.use("/api/contacts", contact);

app.get("/", (req, res) => {
  res.send("hello api");
});

// connect database
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log("connect to mongo db"));

// server
app.listen(process.env.PORT, () =>
  console.log(`server is running on port ${process.env.PORT}`)
);
