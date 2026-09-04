const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

// Route files
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const emergencyRoutes = require('./routes/emergencyRoutes');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/emergency', emergencyRoutes);


// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API is running optimally' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});