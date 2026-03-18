const mongoose = require('mongoose');

const CouncilReportSchema = new mongoose.Schema({
  weekStart: { type: Date, required: true },
  weekEnd: { type: Date, required: true },
  overallScore: { type: Number, required: true },
  previousWeekScore: { type: Number },
  verdict: { type: String, required: true },
  directives: [{ type: String }],
  failures: [{ type: String }],
  patterns: [{ type: String }],
  ministryBreakdown: [{
    ministryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ministry' },
    score: { type: Number }
  }]
});

module.exports = mongoose.model('CouncilReport', CouncilReportSchema);
