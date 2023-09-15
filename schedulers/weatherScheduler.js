const nodemailer = require('nodemailer');
const cron = require('node-cron');

// Create a transporter using your email service (e.g., Gmail)
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'afrarakram98@gmail.com',
    pass: 'ldsf nwct gzqs qtap', // Use an app password for security
  },
});

function fetchWeatherDataForUsers() {
  // Implement weather data fetching logic here
  // Return an array of weather data for all users
}

async function sendWeatherReports(weatherData) {
  // Iterate over weatherData and send reports to users' emails
  // Implement email sending logic here
}

function init() {
  // Define a cron job to send hourly weather reports every 3 hours
  cron.schedule('0 */3 * * *', async () => {
    try {
      // Fetch weather data for users (you'll need to implement this)
      const weatherData = await fetchWeatherDataForUsers();
      // Send weather reports to users' emails
      await sendWeatherReports(weatherData);
      console.log('Hourly weather reports sent');
    } catch (err) {
      console.error('Error sending hourly weather reports:', err);
    }
  });
}

module.exports = {
  init,
};
