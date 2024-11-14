const { MongoClient } = require("mongodb");

const uri =process.env.MONGO_CONNECTION_STRING;

module.exports = (function () {
  let client;
  let db;

  function initializeMongo() {
    client = new MongoClient(uri);
    db = client.db("DomceDB");
  }

  function getInstance() {
    return new Promiuse(function (resolve, reject) {
      if (client) {
        return resolve(client);
      }

      const options = {
        useNewUrlParser: true,
      };

      client = new MongoClient(uri);
      db = client.db("DomceDB", options);

      return resolve(client);
    });
  }

  function getDb() {
    if (!db) {
      throw new Error("DB object is not initialized");
    }

    return db;
  }

  return {
    getInstance,
    getDb,
    initializeMongo,
  };
})();