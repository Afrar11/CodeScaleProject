const nodemailer = require('nodemailer');
const cron = require('node-cron');
const axios = require('axios');

// Create a transporter using your email service (e.g., Gmail)
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'afrar.akram98@gmail.com',
    pass: 'ldsf nwct gzqs qtap', 
  },
});

async function fetchWeatherDataForUsers() {
  try {
    // Make a GET request to OpenWeatherMap's API with your API key
    const response = await axios.get(
      // Replace with the actual API endpoint and API key
      `https://api.openweathermap.org/data/2.5/weather?q=city,us&appid=f2eb8fb1aea2f635343e95934d2ba0b9`
    );

    // Process the response data and return the relevant weather information
    const weatherData = response.data;
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

async function sendWeatherReports(weatherData) {
  try {
    // Customize email content and formatting
    const mailOptions = {
      from: 'afrar.akram98@gmail.com',
      to: 'user_email@example.com', // Replace with the user's email
      subject: 'Hourly Weather Report',
      text: `Here is the weather report: ${JSON.stringify(weatherData)}`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Weather report sent');
  } catch (error) {
    console.error('Error sending weather report:', error);
    throw error;
  }
}

function init() {
  // Define a cron job to send hourly weather reports every 3 hours (customize as needed)
  cron.schedule('0 */3 * * *', async () => {
    try {
      // Fetch weather data for users (you'll need to implement this)
      const weatherData = await fetchWeatherDataForUsers();
      // Send weather reports to users' emails
      await sendWeatherReports(weatherData);
      console.log('Hourly weather reports sent');
    } catch (error) {
      console.error('Error sending hourly weather reports:', error);
    }
  });
}

module.exports = {
  init,
};
