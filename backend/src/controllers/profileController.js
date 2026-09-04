const MedicalProfile = require('../models/MedicalProfile');
const crypto = require('crypto');

// Generate unique Emergency ID (e.g., MLK-7F82A9)
const generateEmergencyId = () => {
  return 'MLK-' + crypto.randomBytes(3).toString('hex').toUpperCase();
};

// @desc    Create or Update medical profile
// @route   POST /api/profile
exports.saveProfile = async (req, res) => {
  try {
    let profile = await MedicalProfile.findOne({ userId: req.user._id });
    
    if (profile) {
      // Update existing profile
      profile = await MedicalProfile.findOneAndUpdate(
        { userId: req.user._id },
        { $set: req.body },
        { new: true } // Returns the updated document
      );
    } else {
      // Create new profile with a generated Emergency ID
      const emergencyId = generateEmergencyId();
      profile = await MedicalProfile.create({
        userId: req.user._id,
        emergencyId,
        ...req.body
      });
    }
    
    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get logged in user's profile
// @route   GET /api/profile
exports.getProfile = async (req, res) => {
  try {
    const profile = await MedicalProfile.findOne({ userId: req.user._id });
    
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    
    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};