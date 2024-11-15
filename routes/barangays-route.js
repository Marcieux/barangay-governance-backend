import express from "express";
import { Barangay } from "../models/barangays-model.js";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const barangay = await Barangay.find();
    res.json(barangay);
  } catch (err) {
    console.error("Error retrieving barangays:", err);
    res
      .status(500)
      .json({ message: "Failed to retrieve barangays", error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { king_id, king_name } = req.body;

  try {
    const updatedBarangay = await Barangay.findByIdAndUpdate(
      id,
      { king_id, king_name },
      { new: true, upsert: false }
    );

    if (!updatedBarangay) {
      return res.status(404).json({ message: "Barangay not found" });
    }

    res.json({ message: "King added successfully", barangay: updatedBarangay });
  } catch (err) {
    console.error("Error updating king:", err);
    res
      .status(500)
      .json({ message: "Failed to update king", error: err.message });
  }
});

router.put("/:id/prince", async (req, res) => {
  const { id } = req.params;
  const { prince } = req.body;

  if (!Array.isArray(prince) || prince.length === 0) {
    return res
      .status(400)
      .json({ message: "Princes array is required and cannot be empty." });
  }

  try {
    const updatedBarangay = await Barangay.findByIdAndUpdate(
      id,
      { $addToSet: { prince: { $each: prince } } },
      { new: true }
    );

    if (!updatedBarangay) {
      return res.status(404).json({ message: "Barangay not found" });
    }

    res.json({
      message: "Princes added to barangay successfully",
      barangay: updatedBarangay,
    });
  } catch (err) {
    console.error("Error updating barangay with princes:", err);
    res.status(500).json({
      message: "Failed to update barangay with princes",
      error: err.message,
    });
  }
});

router.put("/:id/cafgu", async (req, res) => {
  const { id } = req.params;
  const { cafgu } = req.body;

  if (!Array.isArray(cafgu) || cafgu.length === 0) {
    return res
      .status(400)
      .json({ message: "Cafgu array is required and cannot be empty." });
  }

  try {
    const updatedBarangay = await Barangay.findByIdAndUpdate(
      id,
      { $addToSet: { cafgu: { $each: cafgu } } },
      { new: true }
    );

    if (!updatedBarangay) {
      return res.status(404).json({ message: "Barangay not found" });
    }

    res.json({
      message: "Cafgu added to barangay successfully",
      barangay: updatedBarangay,
    });
  } catch (err) {
    console.error("Error updating barangay with cafgu:", err);
    res.status(500).json({
      message: "Failed to update barangay with cafgu",
      error: err.message,
    });
  }
});

router.put("/:id/purok-chair", async (req, res) => {
  const { id } = req.params;
  const { purok_chair } = req.body;

  if (!Array.isArray(purok_chair) || purok_chair.length === 0) {
    return res
      .status(400)
      .json({ message: "Purok Chair array is required and cannot be empty." });
  }

  try {
    const updatedBarangay = await Barangay.findByIdAndUpdate(
      id,
      { $addToSet: { purok_chair: { $each: purok_chair } } },
      { new: true }
    );

    if (!updatedBarangay) {
      return res.status(404).json({ message: "Barangay not found" });
    }

    res.json({
      message: "Purok Chair added to barangay successfully",
      barangay: updatedBarangay,
    });
  } catch (err) {
    console.error("Error updating barangay with Purok Chair:", err);
    res.status(500).json({
      message: "Failed to update barangay with Purok Chair",
      error: err.message,
    });
  }
});

router.put("/:id/tagapamayapa", async (req, res) => {
  const { id } = req.params;
  const { tagapamayapa } = req.body;

  if (!Array.isArray(tagapamayapa) || tagapamayapa.length === 0) {
    return res
      .status(400)
      .json({ message: "Purok Chair array is required and cannot be empty." });
  }

  try {
    const updatedBarangay = await Barangay.findByIdAndUpdate(
      id,
      { $addToSet: { tagapamayapa: { $each: tagapamayapa } } },
      { new: true }
    );

    if (!updatedBarangay) {
      return res.status(404).json({ message: "Barangay not found" });
    }

    res.json({
      message: "Purok Chair added to barangay successfully",
      barangay: updatedBarangay,
    });
  } catch (err) {
    console.error("Error updating barangay with Purok Chair:", err);
    res.status(500).json({
      message: "Failed to update barangay with Purok Chair",
      error: err.message,
    });
  }
});

export default router;
