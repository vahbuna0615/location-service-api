const express = require('express');
const router = express.Router();
const { createCoords, getDistance, getClosest } = require('../controllers/locationController');
const { protect } = require('../middleware/authMiddleware');

router.post('/location', protect, createCoords);
router.get('/distance', getDistance);
router.get('/closest', protect, getClosest);

module.exports = router;