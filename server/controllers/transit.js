const TransitEvent = require('../models/TransitEvent');
const BirthChart = require('../models/BirthChart');
const ephemeris = require('../utils/ephemeris');

exports.generateTransits = async (req, res, next) => {
  try {
    const chart = await BirthChart.findById(req.params.chartId);
    if (!chart) return res.status(404).json({ message: 'Chart not found' });
    if (chart.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });

    // For demo: compute transit events for the next 30 days using ephemeris.getTransits
    const transits = await ephemeris.getTransits({ chart: chart.chartJson, days: req.body.days || 30 });

    const created = await TransitEvent.insertMany(transits.map(t => ({
      chart: chart._id,
      timestamp: t.timestamp,
      description: t.description,
      type: t.type,
      severity: t.severity,
      planets: t.planets
    })));

    res.json({ transits: created });
  } catch (err) {
    next(err);
  }
};

exports.listTransitsForChart = async (req, res, next) => {
  try {
    const transits = await TransitEvent.find({ chart: req.params.chartId }).sort({ timestamp: 1 });
    res.json({ transits });
  } catch (err) {
    next(err);
  }
};
