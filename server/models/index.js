const mongoose = require('mongoose');
const Ministry = require('./Ministry');
const Action = require('./Action');
const Log = require('./Log');
const DailySnapshot = require('./DailySnapshot');
const CouncilReport = require('./CouncilReport');

// Determine connection string from environment or use a local fallback if allowed
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/marc';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`🔱 MongoDB Connected`);
  } catch (err) {
    console.error(`💥 Error connecting to MongoDB:`, err.message);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  Ministry,
  Action,
  Log,
  DailySnapshot,
  CouncilReport
};
