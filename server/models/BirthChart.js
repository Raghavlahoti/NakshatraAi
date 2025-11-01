const mongoose = require('mongoose');

const BirthChartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String }, // optional label
  birthData: {
    date: { type: String, required: true }, // YYYY-MM-DD
    time: { type: String, required: true }, // HH:mm (local)
    timezone: { type: String, required: true },
    place: { type: String }, // free text or geoname id
    lat: Number,
    lon: Number
  },
  chartJson: { type: Object }, // calculated chart (planets, houses, aspects)
  explainability: {
    provenance: String,
    confidence: Number,
    notes: String
  },
  visibility: { type: String, enum: ['private','shared'], default: 'private' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BirthChart', BirthChartSchema);
