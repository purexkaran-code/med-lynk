const express = require('express');
const { getEmergencyProfile } = require('../controllers/emergencyController');

const router = express.Router();

// This route is PUBLIC. No 'protect' middleware is used here.
router.get('/:emergencyId', getEmergencyProfile);

module.exports = router;