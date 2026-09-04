const mongoose = require('mongoose');

const medicalProfileSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    unique: true // One profile per user
  },
  emergencyId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  bloodGroup: { type: String, default: 'Unknown' },
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
  }
}, { timestamps: true });

module.exports = mongoose.model('MedicalProfile', medicalProfileSchema);