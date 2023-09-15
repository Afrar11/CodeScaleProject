const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const weatherScheduler = require('./schedulers/weatherScheduler');

const app = express();

mongoose.connect('mongodb+srv://afrar11:<eFTqz8jcDHqJWM2i>@cluster0.onkjnbq.mongodb.net/?retryWrites=true&w=majority', {
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
