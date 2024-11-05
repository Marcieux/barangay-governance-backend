import express from "express";
import { People } from "../models/people-model.js";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const people = await People.find();
    res.json(people);
  } catch (err) {
    console.error("Error retrieving people:", err);
    res
      .status(500)
      .json({ message: "Failed to retrieve people", error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedPerson = await People.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedPerson) {
      return res.status(404).json({ message: "Person not found" });
    }

    res.json(updatedPerson);
  } catch (err) {
    console.error("Error updating person:", err);
    res
      .status(500)
      .json({ message: "Failed to update person", error: err.message });
  }
});

export default router;
