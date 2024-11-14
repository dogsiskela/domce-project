const http = require("http");

const app = require("./app");
const { initializeMongo } = require("./database/database.config");

const port = 4000;

const server = http.createServer(app);

const initialize = () => {
  initializeMongo();
  console.log("Listening on localhost:4000");
};

server.listen(port, initialize());
