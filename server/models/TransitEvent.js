const mongoose = require('mongoose');

const TransitSchema = new mongoose.Schema({
  chart: { type: mongoose.Schema.Types.ObjectId, ref: 'BirthChart', required: true },
  timestamp: { type: Date, required: true },
  description: String,
  type: String,
  severity: { type: String, enum: ['low','medium','high'], default: 'low' },
  planets: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TransitEvent', TransitSchema);
