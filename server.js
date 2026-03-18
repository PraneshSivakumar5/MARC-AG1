require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./server/routes/api');
const { connectDB } = require('./server/models');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB();

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
// We'll serve from the current directory so `index.html` and `css/` `js/` work
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
app.listen(PORT, () => {
  console.log(`\n🔱 M.A.R.C - I Backend Online 🔱`);
  console.log(`📡 Server listening on http://localhost:${PORT}`);
});
