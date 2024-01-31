const express = require('express');
const router = express.Router();
const { createCoords, getDistance } = require('../controllers/locationController');

router.post('/location', createCoords);
router.get('/distance', getDistance);

module.exports = router;