const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const articles = require("./routes/articlesRoute.js");
const users = require("./routes/usersRoute.js");

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (error) => {
  console.log(error);
});

let app = express();

app.use(cors());
app.use(express.json());
app.use("/api/articles", articles);
app.use("/api/users", users);
app.get("/", (_, res) => {
  res.send("App is running 🚀");
});

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
