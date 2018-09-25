const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const { forOwn } = require("lodash");
const { MONGODB_CONNECTION_STRING } = require("../constants");
const models = require("../models");
const options = require("./options.json");

mongoose.connect(
  MONGODB_CONNECTION_STRING,
  options
);

const db = mongoose.connection;

db.on("error", err => {
  debug(`MongoDB: ${err.message}`);
  process.kill(process.pid, "SIGINT");
});

db.on("reconnected", () => {
  debug(`MongoDB: reconnected!`);
});

db.once("open", () => {
  if (NODE_ENV !== "development") {
    debug(`MongoDB: connected on ${MONGO_URL}!`);
  }
});

db.on("disconnected", () => {
  if (NODE_ENV !== "development") {
    debug("MongoDB: disconnected!");
  }
});

forOwn(models, initModel => initModel(db));

module.exports = db;
