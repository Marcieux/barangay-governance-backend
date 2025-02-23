import express from "express";
import { Leader } from "../models/leader-model.js";
import { Member } from "../models/member-model.js";

const router = express.Router();

// Get all member
router.get("/", async (req, res) => {
  try {
    const fm = await Member.find();
    res.json({ success: true, data: fm });
  } catch (err) {
    console.error("Error retrieving FMs:", err);
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: "Failed to retrieve FMs" },
    });
  }
});

// Get a member by ID
router.get("/:member_id", async (req, res) => {
  const { member_id } = req.params;

  try {
    const fm = await Member.findOne({ member_id });

    if (!fm) {
      return res.status(404).json({
        success: false,
        error: { code: "FM_NOT_FOUND", message: "Add the FM first." },
      });
    }

    res.json({ success: true, data: fm });
  } catch (err) {
    console.error("Error retrieving FM by member_id:", err);
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: "Failed to retrieve FM" },
    });
  }
});

// Get the count of members
router.get("/stats/count", async (req, res) => {
  const { barangay } = req.query;

  if (!barangay) {
    return res.status(400).json({ message: "Barangay name is required" });
  }

  try {
    const memberCount = await Member.countDocuments({  barangay_id: barangay });
    res.json({ count: memberCount });
  } catch (err) {
    console.error("Error counting members:", err);
    res.status(500).json({ message: "Failed to count members", error: err.message });
  }
});

// Update a member
router.put("/:member_id", async (req, res) => {
  const { member_id } = req.params;
  const updatedData = req.body;

  try {
    const updatedFm = await Member.findOneAndUpdate({ member_id }, updatedData, {
      new: true,
    });

    if (!updatedFm) {
      return res.status(404).json({
        success: false,
        error: { code: "FM_NOT_FOUND", message: "FM not found" },
      });
    }

    res.json({ success: true, data: updatedFm });
  } catch (err) {
    console.error("Error updating FM:", err);
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: "Failed to update FM" },
    });
  }
});


// Create a member and update the leader's array
router.post("/", async (req, res) => {
  const {
    member_id,
    member_name,
    precinct,
    purok,
    barangay_id,
    barangay_name,
    king_id,
    king_name,
    prince_id,
    prince_name,
    general_id,
    general_name,
    leader_id,
    leader_name,

  } = req.body;

  try {
    const updatedMember = await Member.findOneAndUpdate(
      { member_id },
      {
        member_name,
        precinct,
        purok,
        barangay_id,
        barangay_name,
        king_id,
        king_name,
        prince_id,
        prince_name,
        general_id,
        general_name,
        leader_id,
        leader_name,
      },
      { upsert: true, new: true }
    );
    
    // Now, update the Leader document by adding the new member to its 'member' array
    if (leader_id && updatedMember._id) {
      await Leader.findOneAndUpdate(
        { leader_id }, // Use leader_id explicitly
        { $addToSet: { member: updatedMember.member_id } },
        { new: true }
      );
    }
    res.status(201).json({ success: true, data: updatedMember });
  } catch (err) {
    console.error("Error creating/updating FM:", err);
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: "Failed to create/update FM" },
    });
  }
});

export default router;