require("dotenv").config();
const StartDebug = require("debug")("app:startUp");
const devDebug = require("debug")("app:dev");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5001;

if (app.get("env") === "development") {
  StartDebug(app.get("env"));
  app.use(morgan("tiny"));
  StartDebug("Morgan Enabled...");
}

// Connection to MongoDB
// connection string from mlab
mongoose
  .connect(
    `mongodb+srv://${process.env.CLUSTER_USER}:${process.env.CLUSTER_PASSWORD}@${process.env.CLUSTER_NAME}-hv03g.mongodb.net/test?retryWrites=true&w=majority`
  )
  .then(res => devDebug("Connected to MLab Successfully ...."))
  .catch(err => devDebug(`Error Connection : ${err.message}`));

// routes
const home = require("./routes/home");
const games = require("./routes/game");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// api endpoints
app.use("/", home);
app.use("/api/games", games);

app.listen(PORT, StartDebug(`App is running on port ${PORT}`));
