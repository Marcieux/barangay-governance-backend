import express from "express";
import { General } from "../models/general-model.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const general = await General.find();
      res.json(general);
    } catch (err) {
      console.error("Error retrieving generals:", err);
      res
        .status(500)
        .json({ message: "Failed to retrieve generals", error: err.message });
    }
  });

router.post("/", async (req, res) => {
  const { general_id, general_name, barangay_id, barangay_name, king_id, king_name, prince_id, prince_name } =
    req.body;

  try {
    const newGeneral = new General({
      general_id,
      general_name,
      barangay_name,
      barangay_id,
      king_id,
      king_name,
      prince_id,
      prince_name
    });

    await newGeneral.save();
    res.status(201).json(newGeneral);
  } catch (err) {
    console.error("Error creating prince:", err);
    res
      .status(500)
      .json({ message: "Failed to create prince", error: err.message });
  }
});
  
export default router;
