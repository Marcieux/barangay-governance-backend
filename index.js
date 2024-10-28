require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BACKEND IS CONNECTED!");
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("CONNECTED TO MONGODB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));
