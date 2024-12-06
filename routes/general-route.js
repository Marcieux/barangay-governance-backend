import express from "express";
import { General } from "../models/general-model.js";
import { Prince } from "../models/prince-model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const general = await General.find()
      .populate("general_id")
      .populate("barangay_id")
      .populate("king_id")
      .populate("prince_id");
    res.json(general);
  } catch (err) {
    console.error("Error retrieving generals:", err);
    res
      .status(500)
      .json({ message: "Failed to retrieve generals", error: err.message });
  }
});

// POST route to create or update a general
router.post("/", async (req, res) => {
  const {
    general_id,
    general_name,
    barangay_id,
    barangay_name,
    king_id,
    king_name,
    prince_id,
    prince_name,
  } = req.body;

  try {
    // Create or update the general in the General collection
    console.log("Received general data:", req.body);
    const updatedGeneral = await General.findOneAndUpdate(
      { general_id }, // Match by general_id to either update or create
      {
        general_name,
        barangay_name,
        barangay_id,
        king_id,
        king_name,
        prince_id,
        prince_name,
      },
      { upsert: true, new: true }
    );

    // Now, update the Prince document by adding the new general to its 'general' array
    if (prince_id && updatedGeneral._id) {
      console.log(
        `Updating prince with ID: ${prince_id} to add general with ID: ${updatedGeneral._id}`
      );

      const updatedPrince = await Prince.findOneAndUpdate(
        { prince_id }, // Use prince_id explicitly
        { $addToSet: { general: updatedGeneral._id } },
        { new: true }
      );

      if (updatedPrince) {
        console.log("Prince updated successfully:", updatedPrince);
      } else {
        console.error(`Prince with ID ${prince_id} not found.`);
      }
    }

    res.status(201).json(updatedGeneral);
  } catch (err) {
    console.error("Error creating or updating general:", err);
    res.status(500).json({
      message: "Failed to create or update general",
      error: err.message,
    });
  }
});

export default router;
