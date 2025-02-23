import express from "express";
import { Barangay } from "../models/barangays-model.js";
import { People } from "../models/people-model.js";

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

// Route to get targets by municipality
router.get("/targets-by-municipality", async (req, res) => {
  try {
    const targets = await Barangay.aggregate([
      {
        $group: {
          _id: "$municipality",
          totalTarget: { $sum: "$target" }
        }
      }
    ]);
    res.json(targets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get distinct municipalities
router.get("/municipalities", async (req, res) => {
  try {
    // Use Mongoose's distinct method
    const municipalities = await Barangay.distinct("municipality");
    // Respond with the list of distinct municipalities
    res.json({ municipalities });
  } catch (err) {
    console.error("Error retrieving municipalities:", err);
    res.status(500).json({
      message: "Failed to retrieve municipalities",
      error: err.message,
    });
  }
});

// Get barangays by municipality
router.get('/by-municipality/:municipality', async (req, res) => {
  try {
    const barangays = await Barangay.find({
      municipality: req.params.municipality.toUpperCase(),
    });

    // Get total people count for each barangay
    const peopleCounts = await People.aggregate([
      { $match: { barangay_id: { $in: barangays.map(b => b._id) } } },
      { $group: { _id: "$barangay_id", totalPeople: { $sum: 1 } } },
    ]);

    // Map total people counts to barangays
    const barangaysWithCounts = barangays.map(barangay => {
      const countData = peopleCounts.find(p => p._id.equals(barangay._id));
      return {
        ...barangay.toObject(),
        totalPeople: countData ? countData.totalPeople : 0,
      };
    });
    
    res.json(barangaysWithCounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
  const { prince_id } = req.body;

  if (!Array.isArray(prince_id) || prince_id.length === 0) {
    return res
      .status(400)
      .json({ message: "Princes array is required and cannot be empty." });
  }

  try {
    const updatedBarangay = await Barangay.findByIdAndUpdate(
      id,
      { $addToSet: { prince_id: { $each: prince_id } } },
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
      .json({ message: "Tagapamayapa array is required and cannot be empty." });
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
      message: "Tagapamayapa added to barangay successfully",
      barangay: updatedBarangay,
    });
  } catch (err) {
    console.error("Error updating barangay with Tagapamayapa:", err);
    res.status(500).json({
      message: "Failed to update barangay with Tagapamayapa",
      error: err.message,
    });
  }
});

router.put("/:id/bhw", async (req, res) => {
  const { id } = req.params;
  const { bhw } = req.body;

  if (!Array.isArray(bhw) || bhw.length === 0) {
    return res
      .status(400)
      .json({ message: "Bhw array is required and cannot be empty." });
  }

  try {
    const updatedBarangay = await Barangay.findByIdAndUpdate(
      id,
      { $addToSet: { bhw: { $each: bhw } } },
      { new: true }
    );

    if (!updatedBarangay) {
      return res.status(404).json({ message: "Barangay not found" });
    }

    res.json({
      message: "Bhw added to barangay successfully",
      barangay: updatedBarangay,
    });
  } catch (err) {
    console.error("Error updating barangay with Bhw:", err);
    res.status(500).json({
      message: "Failed to update barangay with Bhw",
      error: err.message,
    });
  }
});

router.put("/:id/tanod", async (req, res) => {
  const { id } = req.params;
  const { tanod } = req.body;

  if (!Array.isArray(tanod) || tanod.length === 0) {
    return res
      .status(400)
      .json({ message: "Tanod array is required and cannot be empty." });
  }

  try {
    const updatedBarangay = await Barangay.findByIdAndUpdate(
      id,
      { $addToSet: { tanod: { $each: tanod } } },
      { new: true }
    );

    if (!updatedBarangay) {
      return res.status(404).json({ message: "Barangay not found" });
    }

    res.json({
      message: "Tanod added to barangay successfully",
      barangay: updatedBarangay,
    });
  } catch (err) {
    console.error("Error updating barangay with Tanod:", err);
    res.status(500).json({
      message: "Failed to update barangay with Tanod",
      error: err.message,
    });
  }
});

router.put("/:id/public-safety", async (req, res) => {
  const { id } = req.params;
  const { public_safety } = req.body;

  if (!Array.isArray(public_safety) || public_safety.length === 0) {
    return res
      .status(400)
      .json({ message: "Public Safety array is required and cannot be empty." });
  }

  try {
    const updatedBarangay = await Barangay.findByIdAndUpdate(
      id,
      { $addToSet: { public_safety: { $each: public_safety } } },
      { new: true }
    );

    if (!updatedBarangay) {
      return res.status(404).json({ message: "Barangay not found" });
    }

    res.json({
      message: "Public Safety added to barangay successfully",
      barangay: updatedBarangay,
    });
  } catch (err) {
    console.error("Error updating barangay with Public Safety:", err);
    res.status(500).json({
      message: "Failed to update barangay with Public Safety",
      error: err.message,
    });
  }
});

router.put("/:id/bantay-dagat", async (req, res) => {
  const { id } = req.params;
  const { bantay_dagat } = req.body;

  if (!Array.isArray(bantay_dagat) || bantay_dagat.length === 0) {
    return res
      .status(400)
      .json({ message: "Bantay Dagat array is required and cannot be empty." });
  }

  try {
    const updatedBarangay = await Barangay.findByIdAndUpdate(
      id,
      { $addToSet: { bantay_dagat: { $each: bantay_dagat } } },
      { new: true }
    );

    if (!updatedBarangay) {
      return res.status(404).json({ message: "Barangay not found" });
    }

    res.json({
      message: "Bantay Dagat added to barangay successfully",
      barangay: updatedBarangay,
    });
  } catch (err) {
    console.error("Error updating barangay with Bantay Dagat:", err);
    res.status(500).json({
      message: "Failed to update barangay with Bantay Dagat",
      error: err.message,
    });
  }
});

router.put("/:id/coastal", async (req, res) => {
  const { id } = req.params;
  const { coastal } = req.body;

  if (!Array.isArray(coastal) || coastal.length === 0) {
    return res
      .status(400)
      .json({ message: "Coastal Dagat array is required and cannot be empty." });
  }

  try {
    const updatedBarangay = await Barangay.findByIdAndUpdate(
      id,
      { $addToSet: { coastal: { $each: coastal } } },
      { new: true }
    );

    if (!updatedBarangay) {
      return res.status(404).json({ message: "Barangay not found" });
    }

    res.json({
      message: "Coastal added to barangay successfully",
      barangay: updatedBarangay,
    });
  } catch (err) {
    console.error("Error updating barangay with Coastal:", err);
    res.status(500).json({
      message: "Failed to update barangay with Coastal",
      error: err.message,
    });
  }
});
export default router;
