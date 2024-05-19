// routes/ecoAction.js
import express from "express";
import { authMiddleware } from "../middleware/AuthMiddleware.js";
// import { authMiddleware } from "../middleware/authMiddleware.js";
import { EcoActionModel } from "../model/EcoAction.js";

const router = express.Router();

// Log an eco-friendly action
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { actionType, description ,time} = req.body;
        const newAction = new EcoActionModel({
            actionType,
            description,
            time: parseFloat(time),
            userId: req.userId
        });
        await newAction.save();
        res.status(201).json({ message: "Action logged successfully", action: newAction });
    } catch (error) {
        console.error("Error in logging action:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get user's dashboard data
router.get('/dashboard', authMiddleware, async (req, res) => {
    try {
        const actions = await EcoActionModel.find({ userId: req.userId });
        const actionSummary = actions.reduce((summary, action) => {
            summary[action.actionType] = (summary[action.actionType] || 0) + 1;
            return summary;
        }, {});

        res.json({ actions, actionSummary });
    } catch (error) {
        console.error("Error in fetching dashboard data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export { router as ecoActionRouter };
