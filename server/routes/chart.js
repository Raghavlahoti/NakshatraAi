const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const chartController = require('../controllers/chart');

router.post('/generate', protect, chartController.generateChart);
router.get('/:id', protect, chartController.getChart);
router.get('/', protect, chartController.listCharts);
router.delete('/:id', protect, chartController.deleteChart);

module.exports = router;
