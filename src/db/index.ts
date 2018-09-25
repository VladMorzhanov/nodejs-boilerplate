import mongoose from "mongoose";
import { MONGODB_CONNECTION_STRING, NODE_ENV } from "../constants";
import options from "./options";
mongoose.Promise = require("bluebird");

mongoose.connect(
  MONGODB_CONNECTION_STRING,
  options
);

const db = mongoose.connection;

db.on("error", err => {
  console.log(`MongoDB: ${err.message}`);
  process.kill(process.pid, "SIGINT");
});

db.on("reconnected", () => {
  console.log(`MongoDB: reconnected!`);
});

db.once("open", () => {
  if (NODE_ENV !== "development") {
    console.log(`MongoDB: connected on ${MONGODB_CONNECTION_STRING}!`);
  }
});

db.on("disconnected", () => {
  if (NODE_ENV !== "development") {
    console.log("MongoDB: disconnected!");
  }
});

export default db;
