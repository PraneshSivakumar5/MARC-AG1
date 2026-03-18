require('dotenv').config();
const mongoose = require('mongoose');
const { Ministry, Action } = require('./models');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/marc';

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('🔱 Connected to MongoDB for seeding...');

    // Clear existing configurations
    await Ministry.deleteMany({});
    await Action.deleteMany({});

    const ministries = [
      {
        slug: 'wealth',
        name: 'Ministry of Wealth',
        avatar: 'Crassus',
        color: 'var(--gold)',
        actions: [
          'Execute weekly budget review',
          'Transfer 20% to savings'
        ]
      },
      {
        slug: 'work',
        name: 'Ministry of Work',
        avatar: 'Machiavelli',
        color: 'var(--gold)',
        actions: [
          'Ship M.A.R.C Phase 2 backend',
          'Read 1 chapter of technical book'
        ]
      },
      {
        slug: 'stoicism',
        name: 'Ministry of Stoicism',
        avatar: 'Aurelius',
        color: 'var(--gold)',
        actions: [
          'Evening review protocol'
        ]
      },
      {
        slug: 'health',
        name: 'Ministry of Health',
        avatar: 'Galen',
        color: 'var(--success-green)',
        actions: [
          'Complete 45min resistance training',
          'In bed by 22:30'
        ]
      }
    ];

    for (const mData of ministries) {
      const ministry = new Ministry({
        slug: mData.slug,
        name: mData.name,
        avatar: mData.avatar,
        color: mData.color
      });
      await ministry.save();

      for (const aText of mData.actions) {
        const action = new Action({
          ministryId: ministry._id,
          text: aText
        });
        await action.save();
      }
    }

    console.log('✅ Seeding complete. The Empire stands ready.');
    process.exit(0);
  } catch (err) {
    console.error('💥 Seeding failed:', err);
    process.exit(1);
  }
};

seedData();
