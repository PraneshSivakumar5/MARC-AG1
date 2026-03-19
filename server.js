require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./server/routes/api');
const { connectDB, Ministry, Action } = require('./server/models');

const app = express();
const PORT = process.env.PORT || 3000;

// Auto-seed function: populates the database if no ministries exist
async function autoSeed() {
  try {
    const count = await Ministry.countDocuments();
    if (count > 0) {
      console.log(`📊 Database already has ${count} ministries. Skipping seed.`);
      return;
    }

    console.log('🌱 Empty database detected. Auto-seeding initial data...');

    const ministries = [
      {
        slug: 'wealth',
        name: 'Ministry of Wealth',
        avatar: 'Crassus',
        color: 'var(--gold)',
        actions: ['Execute weekly budget review', 'Transfer 20% to savings']
      },
      {
        slug: 'work',
        name: 'Ministry of Work',
        avatar: 'Machiavelli',
        color: 'var(--gold)',
        actions: ['Ship M.A.R.C Phase 2 backend', 'Read 1 chapter of technical book']
      },
      {
        slug: 'stoicism',
        name: 'Ministry of Stoicism',
        avatar: 'Aurelius',
        color: 'var(--gold)',
        actions: ['Evening review protocol']
      },
      {
        slug: 'health',
        name: 'Ministry of Health',
        avatar: 'Galen',
        color: 'var(--success-green)',
        actions: ['Complete 45min resistance training', 'In bed by 22:30']
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

    console.log('✅ Auto-seed complete. The Empire stands ready.');
  } catch (err) {
    console.error('⚠️ Auto-seed warning:', err.message);
  }
}

// Initialize: Connect to DB, then auto-seed, then start server
async function startServer() {
  await connectDB();
  await autoSeed();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Main API Routes
  app.use('/api', apiRoutes);

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', time: new Date().toISOString() });
  });

  // Serve frontend static files
  const staticPath = path.join(__dirname, './');
  app.use(express.static(staticPath));

  // Fallback for SPA (Catch-all for any other requests)
  app.use((req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke internally!' });
  });

  // Start server
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🔱 M.A.R.C - I Backend Online 🔱`);
    console.log(`📡 Server listening on port ${PORT}`);
  });
}

startServer();

