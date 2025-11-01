const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  chart: { type: mongoose.Schema.Types.ObjectId, ref: 'BirthChart' },
  title: String,
  body: String,
  scheduledFor: Date,
  delivered: { type: Boolean, default: false },
  metadata: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', NotificationSchema);
