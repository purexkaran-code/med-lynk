const MedicalProfile = require('../models/MedicalProfile');
const crypto = require('crypto');

// Generate unique Emergency ID
const generateEmergencyId = () => {
  return 'MLK-' + crypto.randomBytes(3).toString('hex').toUpperCase();
};

// Helper: Dynamically calculate completion percentage
const calculateProgress = (data) => {
  let progress = 0;
  
  // Basic Information (20%) - Assumes blood group is the bare minimum basic info for now
  if (data.bloodGroup && data.bloodGroup.trim() !== '') progress += 20;
  
  // Allergies (15%)
  if (data.allergies && data.allergies.length > 0) progress += 15;
  
  // Medications (15%)
  if (data.medications && data.medications.length > 0) progress += 15;
  
  // Conditions (15%)
  if (data.conditions && data.conditions.length > 0) progress += 15;
  
  // Surgeries/History (15%)
  if (data.surgeries && data.surgeries.length > 0) progress += 15;
  
  // Emergency Contact (10%)
  if (data.emergencyContact && data.emergencyContact.name && data.emergencyContact.phone) progress += 10;
  
  // Questionnaire (10%)
  if (data.questionnaire && Object.keys(data.questionnaire).length > 0) progress += 10;

  // Cap at 100 just in case
  return progress > 100 ? 100 : progress;
};

// @desc    Create or Update medical profile
// @route   POST /api/profile
exports.saveProfile = async (req, res) => {
  try {
    let profile = await MedicalProfile.findOne({ userId: req.user._id });
    
    // Calculate new progress based on incoming data merged with existing data
    const mergedData = { ...(profile ? profile.toObject() : {}), ...req.body };
    const calculatedPercentage = calculateProgress(mergedData);
    
    // Determine if fully complete (100% AND confirmed on review page)
    const isComplete = req.body.onboardingStep === 'completed' && calculatedPercentage === 100;

    if (profile) {
      profile = await MedicalProfile.findOneAndUpdate(
        { userId: req.user._id },
        { 
          $set: {
            ...req.body,
            completionPercentage: calculatedPercentage,
            isProfileComplete: isComplete
          }
        },
        { new: true }
      );
    } else {
      const emergencyId = generateEmergencyId();
      profile = await MedicalProfile.create({
        userId: req.user._id,
        emergencyId,
        ...req.body,
        completionPercentage: calculatedPercentage,
        isProfileComplete: isComplete
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
    
    // If no profile exists yet, return an empty template with 0%
    if (!profile) {
      return res.status(200).json({ 
        success: true, 
        profile: { completionPercentage: 0, onboardingStep: 'profile_setup', isProfileComplete: false } 
      });
    }
    
    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};