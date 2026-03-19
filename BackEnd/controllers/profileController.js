import Profile from "../models/Profile.js";

// @desc    Get profile data
// @route   GET /api/profile
export const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({}); // Create default profile if it doesn't exist
    }
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// @desc    Update profile data
// @route   PUT /api/profile
export const updateProfile = async (req, res) => {
  try {
    const { name, role, description, imageUrl, availableForWork } = req.body;
    let profile = await Profile.findOne();

    if (!profile) {
      profile = await Profile.create({});
    }

    profile.name = name ?? profile.name;
    profile.role = role ?? profile.role;
    profile.description = description ?? profile.description;
    profile.imageUrl = imageUrl ?? profile.imageUrl;
    // For boolean values, since they can be false, check against undefined
    if (availableForWork !== undefined) profile.availableForWork = availableForWork;

    await profile.save();

    res.status(200).json({ success: true, data: profile, message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
