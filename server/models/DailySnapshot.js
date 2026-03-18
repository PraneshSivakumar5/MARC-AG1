const mongoose = require('mongoose');

const DailySnapshotSchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  laurelScore: { type: Number, required: true },
  motivationalState: { type: String },
  ministryScores: [{
    ministryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ministry' },
    score: { type: Number },
    status: { type: String }
  }]
});

module.exports = mongoose.model('DailySnapshot', DailySnapshotSchema);
