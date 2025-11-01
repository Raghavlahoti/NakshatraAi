const BirthChart = require('../models/BirthChart');
const ephemeris = require('../utils/ephemeris');

exports.generateChart = async (req, res, next) => {
  try {
    const { date, time, timezone, lat, lon, name, place } = req.body;
    if (!date || !time || !timezone) return res.status(400).json({ message: 'Missing birth data' });

    // call ephemeris to get planetary positions (placeholder)
    const positions = await ephemeris.getPositions({ date, time, timezone, lat, lon });

    // simple example: houses & aspects can be computed here or via a library
    const chartJson = {
      positions,
      houses: ephemeris.calcHouses ? ephemeris.calcHouses({ lat, lon, date, time, timezone }) : {},
      aspects: ephemeris.calcAspects ? ephemeris.calcAspects(positions) : []
    };

    const explainability = {
      provenance: `provider:${process.env.EPHEMERIS_PROVIDER || 'placeholder'}`,
      confidence: 0.85,
      notes: 'Auto-generated; replace with provider metadata once enabled'
    };

    const chart = await BirthChart.create({
      user: req.user._id,
      name: name || `${req.user.name}'s chart`,
      birthData: { date, time, timezone, place, lat, lon },
      chartJson,
      explainability
    });

    res.status(201).json({ chart });
  } catch (err) {
    next(err);
  }
};

exports.getChart = async (req, res, next) => {
  try {
    const chart = await BirthChart.findById(req.params.id).populate('user', 'name email');
    if (!chart) return res.status(404).json({ message: 'Chart not found' });
    if (chart.user._id.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
    res.json({ chart });
  } catch (err) {
    next(err);
  }
};

exports.listCharts = async (req, res, next) => {
  try {
    const charts = await BirthChart.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ charts });
  } catch (err) {
    next(err);
  }
};

exports.deleteChart = async (req, res, next) => {
  try {
    const chart = await BirthChart.findById(req.params.id);
    if (!chart) return res.status(404).json({ message: 'Chart not found' });
    if (chart.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
    await chart.remove();
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};
