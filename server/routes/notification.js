const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const notificationController = require('../controllers/notification');

router.post('/schedule', protect, notificationController.schedule);
router.get('/', protect, notificationController.list);

module.exports = router;
