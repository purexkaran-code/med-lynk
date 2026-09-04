const express = require('express');
const { saveProfile, getProfile } = require('../controllers/profileController');
const { protect } = require('../middlewares/authMiddleware'); // Import our protection middleware

const router = express.Router();

// Apply the 'protect' middleware to both routes so only logged-in users can access them
router.route('/')
  .get(protect, getProfile)
  .post(protect, saveProfile);

module.exports = router;
