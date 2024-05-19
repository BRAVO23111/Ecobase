import express from "express";
import { authMiddleware } from "../middleware/AuthMiddleware.js";
// import { authMiddleware } from "../middleware/authMiddleware.js";
import { InitiativeModel } from "../model/Intiatives.js";

const router = express.Router();

// List of all initiatives
router.get("/", async (req, res) => {
  try {
    const initiatives = await InitiativeModel.find()
      .populate("createdBy", "username")
      .populate("participants", "username");
    res.json(initiatives);
  } catch (error) {
    console.error("Error in fetching initiatives:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create an Initiative
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, description, date, location } = req.body;
    const newInitiative = new InitiativeModel({
      name,
      description,
      date,
      location,
      createdBy: req.userId,
    });
    await newInitiative.save();
    res.status(201).json({
      message: "Initiative created successfully",
      initiative: newInitiative,
    });
  } catch (error) {
    console.error("Error in creating initiative:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Join an initiative
router.post("/:id/join", authMiddleware, async (req, res) => {
  try {
    const initiative = await InitiativeModel.findById(req.params.id);
    if (!initiative) {
      return res.status(404).json({ message: "Initiative not found" });
    }
    if (initiative.participants.includes(req.userId)) {
      return res.status(400).json({ message: "You have already joined this initiative" });
    }
    initiative.participants.push(req.userId);
    await initiative.save();
    res.json({ message: "Joined initiative successfully", initiative });
  } catch (error) {
    console.error("Error in joining initiative:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update an initiative
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, description, date, location } = req.body;
    const initiative = await InitiativeModel.findById(req.params.id);
    if (!initiative) {
      return res.status(404).json({ message: "Initiative not found" });
    }
    if (initiative.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "You are not authorized to update this initiative" });
    }
    initiative.name = name;
    initiative.description = description;
    initiative.date = date;
    initiative.location = location;
    await initiative.save();
    res.json({ message: "Initiative updated successfully", initiative });
  } catch (error) {
    console.error("Error in updating initiative:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete an initiative
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const initiative = await InitiativeModel.findById(req.params.id);
    if (!initiative) {
      return res.status(404).json({ message: "Initiative not found" });
    }
    if (initiative.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "You are not authorized to delete this initiative" });
    }
    await InitiativeModel.deleteOne({ _id: initiative._id });
    res.json({ message: "Initiative deleted successfully" });
  } catch (error) {
    console.error("Error in deleting initiative:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get initiatives joined by the user
router.get("/joined", authMiddleware, async (req, res) => {
  try {
    const initiatives = await InitiativeModel.find({ participants: req.userId })
      .populate("createdBy", "username")
      .populate("participants", "username");
    res.json(initiatives);
  } catch (error) {
    console.error("Error in fetching joined initiatives:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Mark an initiative as completed
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const initiative = await InitiativeModel.findById(req.params.id);
    if (!initiative) {
      return res.status(404).json({ message: 'Initiative not found' });
    }
    // Check if the user is the creator of the initiative or has admin privileges
    if (initiative.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this initiative' });
    }
    await InitiativeModel.deleteOne({ _id: initiative._id });
    res.json({ message: 'Initiative deleted successfully' });
  } catch (error) {
    console.error('Error deleting initiative:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


export { router as initiativeRouter };
