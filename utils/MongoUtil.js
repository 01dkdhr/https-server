const path = require('path');
const MongoClient = require('mongodb').MongoClient;

let mongoConfig = null;
try {
  const localConfig = require(path.join(__dirname, '../local-config.json'));
  mongoConfig = localConfig['mongo'];
} catch (e) {
  console.log('init StockStorage err:', e);
}

const MongoUtil = {
  getClient(dbName) {
    return new Promise((resolve, reject) => {
      try {
        const dbInfo = mongoConfig['dbs'][dbName];
        if (!dbInfo) {
          reject(`not find db ${dbName}`);
        }
        const url = `mongodb://${dbInfo.user}:${dbInfo.password}@${mongoConfig.host}:${mongoConfig.port}/${dbName}`;
        MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(client);
        });
      } catch (err) {
        reject(err);
      }
    });
  },
  disConnect(client) {
    try {
      client.close();
      client = null;
    } catch (err) {
      console.log('disConnect err:', err);
    }
  },
  getDatas({ dbName, tableName, filter, projection }) {
    return new Promise((resolve, reject) => {
      this.getClient(dbName)
        .then((client) => {
          const db = client.db(dbName);  
          const collection = db.collection(tableName);
          collection.find(filter, { projection }).toArray((err, result) => {
            this.disConnect(client);
            
            if (err) {
              reject(err);
              return;
            }

            resolve(result);
          });
        })
    });
  }
};

module.exports = MongoUtil;