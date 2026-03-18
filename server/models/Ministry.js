const mongoose = require('mongoose');

const MinistrySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar: { type: String },
  icon: { type: String },
  color: { type: String, default: 'var(--gold)' },
  description: { type: String }
});

module.exports = mongoose.model('Ministry', MinistrySchema);
