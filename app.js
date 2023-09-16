const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const weatherScheduler = require('./schedulers/weatherScheduler');
require('dotenv').config();

const app = express();

// MongoDB connection string (replace with your credentials and database name)
const mongodbUri = 'mongodb+srv://afrar11:Sep@2023@cluster0.onkjnbq.mongodb.net/weatherReport';

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Initialize the weather scheduler
    weatherScheduler.init();
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use(express.json());
app.use('/api', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});
