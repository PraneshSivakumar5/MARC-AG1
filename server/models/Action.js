const mongoose = require('mongoose');

const ActionSchema = new mongoose.Schema({
  ministryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ministry', required: true },
  text: { type: String, required: true },
  weight: { type: Number, default: 1 },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Action', ActionSchema);
