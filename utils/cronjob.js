const cron = require("node-cron");
const https = require("https");

const BACKEND_URL='https://nodejs-medicine-delivery.onrender.com'

const makeRequest = () => {
  console.log(`Sending request to backend at ${BACKEND_URL}...`);
  
  https
    .get(BACKEND_URL, (res) => {
      if (res.statusCode === 200) {
        console.log("Server restarted");
      } else {
        console.log(
          `Failed to restart server with status code: ${res.statusCode}`
        );
      }
    })
    .on("error", (err) => {
      console.error("Error during restart:", err.message);
    });
};

cron.schedule("*/14 * * * *", makeRequest);

module.exports = {
  makeRequest,
};