const MedicalProfile = require('../models/MedicalProfile');
const AccessLog = require('../models/AccessLog');

// @desc    Get public emergency profile by emergencyId
// @route   GET /api/emergency/:emergencyId
exports.getEmergencyProfile = async (req, res) => {
  try {
    const { emergencyId } = req.params;

    // Find profile, but strip out the private database references
    const profile = await MedicalProfile.findOne({ emergencyId })
      .select('-_id -userId -createdAt -updatedAt -__v');

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Emergency profile not found' });
    }

    // Log the access in the background (we don't wait for it to finish before sending the response)
    AccessLog.create({ emergencyId, accessType: 'QR_SCAN' })
      .catch(err => console.error("Failed to log access:", err));

    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};