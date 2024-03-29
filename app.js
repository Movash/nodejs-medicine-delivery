const express = require("express");
const router = express.Router();
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const drugstoresRouter = require("./routes/api/drugstores");
const ordersRouter = require("./routes/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const indexRouter = router.get("/", (req, res) => {
  res.send("OK");
});

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"))


app.use("/", indexRouter);

app.use("/api/drugstores", drugstoresRouter);
app.use("/users", ordersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
module.exports.indexRouter = indexRouter;
