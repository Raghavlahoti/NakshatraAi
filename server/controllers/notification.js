const Notification = require('../models/Notification');

exports.schedule = async (req, res, next) => {
  try {
    const { title, body, scheduledFor, chartId, metadata } = req.body;
    const noti = await Notification.create({
      user: req.user._id,
      chart: chartId,
      title, body,
      scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
      metadata
    });
    res.status(201).json({ notification: noti });
  } catch (err) { next(err); }
};

exports.list = async (req, res, next) => {
  try {
    const list = await Notification.find({ user: req.user._id }).sort({ scheduledFor: -1 });
    res.json({ list });
  } catch (err) { next(err); }
};
