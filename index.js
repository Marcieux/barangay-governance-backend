import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import barangayRoute from "./routes/barangays-route.js"
import peopleRoute from "./routes/people-route.js"
import princeRoute from "./routes/prince-route.js"
import generalRoute from "./routes/general-route.js"
import loginRoute from "./routes/login-route.js"

dotenv.config();

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

app.use("/barangay", barangayRoute);
app.use("/people", peopleRoute);
app.use("/prince", princeRoute);
app.use("/general", generalRoute);
app.use("/login", loginRoute);