const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");

app.get("/", (req, res) => {
  res.send("BACKEND IS CONNECTED!");
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
