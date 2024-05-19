import express from "express";
// import { authMiddleware } from "../middleware/AuthMiddleware.js";
import { UserModel } from "../model/User.js";
import { ProfileModel } from "../model/Profile.js";
import { authMiddleware } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { firstName, lastName, bio, environmentalInterests } = req.body;
    let profile = await ProfileModel.findOne({ userId: req.userId });

    if (profile) {
      profile.firstName = firstName;
      profile.lastName = lastName;
      profile.bio = bio;
      profile.environmentalInterests = environmentalInterests;
    } else {
      profile = new ProfileModel({
        userId: req.userId,
        firstName,
        lastName,
        bio,
        environmentalInterests
      });
    }

    await profile.save();

    const user = await UserModel.findById(req.userId);
    user.profile = profile._id;
    await user.save();

    res.json({ message: "Profile created successfully", profile });
  } catch (error) {
    console.error("Error in profile update:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get profile endpoint
router.get('/', authMiddleware, async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({ userId: req.userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error("Error in fetching profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router as ProfileRouter };
