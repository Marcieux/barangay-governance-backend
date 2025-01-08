import express from "express";
import { General } from "../models/general-model.js";
import { Leader } from "../models/leader-model.js";

const router = express.Router();

// Get all leaders
router.get("/", async (req, res) => {
  try {
    const fl = await Leader.find();
    res.json({ success: true, data: fl });
  } catch (err) {
    console.error("Error retrieving FLs:", err);
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: "Failed to retrieve FLs" },
    });
  }
});

// Get a leader by ID
router.get("/:leader_id", async (req, res) => {
  const { leader_id } = req.params;

  try {
    const fl = await Leader.findOne({ leader_id });

    if (!fl) {
      return res.status(404).json({
        success: false,
        error: { code: "FL_NOT_FOUND", message: "Add the FL first." },
      });
    }

    res.json({ success: true, data: fl });
  } catch (err) {
    console.error("Error retrieving FL by leader_id:", err);
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: "Failed to retrieve FL" },
    });
  }
});

// Update a leader
router.put("/:leader_id", async (req, res) => {
  const { leader_id } = req.params;
  const updatedData = req.body;

  try {
    const updatedFl = await Leader.findOneAndUpdate({ leader_id }, updatedData, {
      new: true,
    });

    if (!updatedFl) {
      return res.status(404).json({
        success: false,
        error: { code: "FL_NOT_FOUND", message: "FL not found" },
      });
    }

    res.json({ success: true, data: updatedFl });
  } catch (err) {
    console.error("Error updating FL:", err);
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: "Failed to update FL" },
    });
  }
});

// Create or update a leader
router.post("/", async (req, res) => {
  const {
    leader_id,
    leader_name,
    precinct,
    purok,
    barangay_id,
    barangay_name,
    king_id,
    king_name,
    general_id,
    general_name,
  } = req.body;

  try {
    const updatedLeader = await Leader.findOneAndUpdate(
      { leader_id },
      {
        leader_name,
        precinct,
        purok,
        barangay_id,
        barangay_name,
        king_id,
        king_name,
        general_id,
        general_name,
      },
      { upsert: true, new: true }
    );

    // Now, update the General document by adding the new leader to its 'leader' array
    if (general_id && updatedLeader._id) {
      await General.findOneAndUpdate(
        { general_id }, // Use general_id explicitly
        { $addToSet: { leader: updatedLeader.leader_id } },
        { new: true }
      );
    }
    res.status(201).json({ success: true, data: updatedLeader });
  } catch (err) {
    console.error("Error creating/updating FL:", err);
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: "Failed to create/update FL" },
    });
  }
});

export default router;
