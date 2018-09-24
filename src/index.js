const http = require("http");
const async = require("async");
const signals = ["SIGINT", "SIGTERM"];
const { printIP } = require("../services/app-service");
const { PORT, NODE_ENV } = require("../constants");
const db = app.get("db");
const cors = require("cors");
const { json, urlencoded } = require("body-parser");
const express = require("express");
const { API_URI } = require("./constants");
const db = require("./db");
const { api } = require("./routers");
const helmet = require("helmet");

const app = express();

app.set("db", db);
app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(API_URI, api);

const server = http.createServer(app);
server.listen(PORT);

server.on("error", onError);
server.on("listening", onListening);

signals.forEach(function(signal) {
  process.once(signal, () => {
    debug(signal, " happened!");
    async.waterfall([closeServer, closeDbConnection], closeApp);
  });
});

const closeApp = err => {
  debug("Now application will be closed!", err || "");
  err ? process.exit(1) : process.exit(0);
};

const closeServer = next => {
  debug("Now server will be closed!");
  server.close(next);
};

const closeDbConnection = next => {
  debug("Now db will be closed!");
  db.close(next);
};

const onListening = () => {
  const addr = server.address();
  debug(`Listening on port ${addr.port}`);
  if (NODE_ENV === "development") {
    debug(`This is testing instance.`);
    debug(`To run production provide NODE_ENV = production.`);
  }
  printIP();
};

const onError = err => {
  if (err.syscall !== "listen") {
    throw err;
  }

  switch (err.code) {
    case "EACCES":
      debug(`Port ${PORT} requires elevated privileges`);
      return process.exit(1);
    case "EADDRINUSE":
      debug(`Port ${PORT} is already in use`);
      return process.exit(1);
    default:
      throw err;
  }
};
