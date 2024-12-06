import express from "express";
import { Prince } from "../models/prince-model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const prince = await Prince.find();
    res.json(prince);
  } catch (err) {
    console.error("Error retrieving prince:", err);
    res
      .status(500)
      .json({ message: "Failed to retrieve prince", error: err.message });
  }
});

router.get("/:prince_id", async (req, res) => {
  const { prince_id } = req.params;

  try {
    const prince = await Prince.findOne({ prince_id });

    if (!prince) {
      return res.status(404).json({ message: "Prince not found" });
    }
    res.json(prince);
  } catch (err) {
    console.error("Error retrieving prince by prince_id:", err);
    res.status(500).json({ message: "Failed to retrieve prince", error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { prince_id, prince_name, barangay_name, barangay_id, king_id } = req.body;

  try {
    const newPrince = new Prince({
      prince_id,
      prince_name,
      barangay_name,
      barangay_id,
      king_id,
    });

    await newPrince.save();
    res.status(201).json(newPrince);
  } catch (err) {
    console.error("Error creating prince:", err);
    res
      .status(500)
      .json({ message: "Failed to create prince", error: err.message });
  }
});

export default router;
