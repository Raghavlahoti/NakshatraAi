const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const transitController = require('../controllers/transit');

router.post('/generate/:chartId', protect, transitController.generateTransits);
router.get('/:chartId', protect, transitController.listTransitsForChart);

module.exports = router;
