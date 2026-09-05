const mongoose = require('mongoose');

const medicalProfileSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    unique: true 
  },
  emergencyId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  bloodGroup: { type: String, default: '' },
  allergies: [{
    name: String,
    severity: String,
    reaction: String
  }],
  medications: [{
    name: String,
    details: String
  }],
  conditions: [{
    name: String,
    status: String
  }],
  surgeries: [{
    name: String,
    year: String
  }],
  emergencyContact: {
    name: String,
    relation: String,
    phone: String
  },
  
  // NEW: Dynamic Onboarding Tracking
  questionnaire: {
    type: Map,
    of: String,
    default: {}
  },
  completionPercentage: {
    type: Number,
    default: 0
  },
  onboardingStep: {
    type: String,
    enum: ['profile_setup', 'questionnaire', 'review', 'completed'],
    default: 'profile_setup'
  },
  isProfileComplete: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('MedicalProfile', medicalProfileSchema);