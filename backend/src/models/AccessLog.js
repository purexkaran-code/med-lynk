const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema({
  emergencyId: { 
    type: String, 
    required: true 
  },
  accessedAt: { 
    type: Date, 
    default: Date.now 
  },
  accessType: { 
    type: String, 
    default: 'QR_SCAN' 
  }
});

module.exports = mongoose.model('AccessLog', accessLogSchema);