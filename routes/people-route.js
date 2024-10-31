import express from "express";
import { People } from "../models/people-model.js";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const people = await People.find();
    console.log("Fetched people:", people); // Log the fetched people
    res.json(people);
  } catch (err) {
    console.error("Error retrieving people:", err); // Log error details
    res
      .status(500)
      .json({ message: "Failed to retrieve people", error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { number } = req.body;
    const updatedPerson = await People.findByIdAndUpdate(
      id,
      { number },
      { new: true }
    );
    res.json(updatedPerson);
  } catch (err) {
    console.error("Error updating number:", err);
    res.status(500).json({ message: "Failed to update number", error: err.message });
  }
});


export default router;
