import express from "express";
import { People } from "../models/people-model.js";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const { barangay_id } = req.query;
    const query = barangay_id ? { barangay_id } : {};
    const people = await People.find(query);
    res.json(people);
  } catch (err) {
    console.error("Error retrieving people:", err);
    res.status(500).json({ message: "Failed to retrieve people" });
  }
});

router.get("/by-barangay", async (req, res) => {
  try {
    const { barangay } = req.query;

    if (!barangay) {
      return res.status(400).json({ message: "Barangay name is required" });
    }

    const people = await People.find({
      barangay_id: barangay,
    });

    res.json(people);
  } catch (err) {
    console.error("Error fetching people by barangay:", err);
    res.status(500).json({
      message: "Failed to fetch people by barangay",
      error: err.message,
    });
  }
});

router.get("/roles-by-municipality", async (req, res) => {
  try {
    const counts = await People.aggregate([
      {
        $group: {
          _id: "$municipality", // Group by municipality
          totalPeople: { $sum: 1 }, // Count all people
          peopleWithRoles: {
            $sum: { $cond: [{ $and: [{ $ne: ["$role", null] }, { $ne: ["$role", ""], }] }, 1, 0] }, // Count people with roles, excludes null & empty values
          },
        },
      },
    ]);
    res.json(counts);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
