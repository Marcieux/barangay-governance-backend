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
