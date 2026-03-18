const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  ministryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ministry', required: true },
  date: { type: Date, default: Date.now, required: true },
  type: { type: String, enum: ['action_completion', 'manual_log'], required: true },
  actionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Action' },
  text: { type: String },
  impact: { type: String }
});

module.exports = mongoose.model('Log', LogSchema);
