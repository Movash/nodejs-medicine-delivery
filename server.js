const mongoose = require("mongoose")
const {makeRequest} = require("./utils/cronjob");

const app = require('./app')

const {DB_HOST, PORT = 3000} = process.env

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");

    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);

      makeRequest();
    });

    server.on("error", (error) => {
      console.error("Error occurred:", error);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });