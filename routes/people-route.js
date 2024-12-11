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

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the request parameters
    // Find the person by ID
    const person = await People.findById(id);

    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }

    // Respond with the found person
    res.json(person);
  } catch (err) {
    console.error("Error retrieving person:", err);
    res
      .status(500)
      .json({ message: "Failed to retrieve person", error: err.message });
  }
});

router.get("/generals/count", async (req, res) => {
  try {
    const { barangay } = req.query;

    if (!barangay) {
      return res.status(400).json({ message: "Barangay name is required" });
    }

    const generalCount = await People.countDocuments({
      barangay_name: { $regex: new RegExp(`^${barangay}$`, "i") },
      role: "general",
    });

    res.json({ count: generalCount });
  } catch (err) {
    console.error("Error fetching generals count:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch generals count", error: err.message });
  }
});

router.get("/princes/count", async (req, res) => {
  try {
    const { barangay } = req.query;

    if (!barangay) {
      return res.status(400).json({ message: "Barangay name is required" });
    }

    const princeCount = await People.countDocuments({
      barangay_name: { $regex: new RegExp(`^${barangay}$`, "i") },
      role: "prince",
    });

    res.json({ count: princeCount });
  } catch (err) {
    console.error("Error fetching prince count:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch prince count", error: err.message });
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
