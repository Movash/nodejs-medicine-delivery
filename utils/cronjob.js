const cron = require("node-cron");
const https = require("https");

const { BACKEND_URL } = process.env;

const makeRequest = () => {
  console.log("Sending request to backend...");

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

// cron.schedule("*/14 * * * *", makeRequest);
cron.schedule("*/20 * * * * *", makeRequest);
