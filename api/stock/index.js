const MongoUtil = require('../../utils/MongoUtil.js');

function responseErr(res, errCode, msg) {
  res.writeHead(200, { 'content-type': 'application/json', "Access-Control-Allow-Origin": "*" });
  res.end(JSON.stringify({
    err_code: errCode,
    msg: msg || "server error",
    result: null
  }));
}

function responseSuccess(res, result) {
  res.writeHead(200, { 'content-type': 'application/json', "Access-Control-Allow-Origin": "*" });
  res.end(JSON.stringify({
    err_code: 0,
    msg: "",
    result: result
  }));
}

module.exports = {
  onRequest(req, res) {
    try {
      if (req.path == '/stock-list') {
        MongoUtil.getClient('node-stock')
          .then((client) => {
            const db = client.db('node-stock');
            const collection = db.collection('stocks');
            collection.find({}, { projection: { "_id": 0, "price_tick": 0, "delisted_data": 0, "sec_type": 0 } }).toArray((err, result) => {
              if (err) {
                console.log('/stock-list err:', err);
                responseErr(res, 10002);
              } else {
                responseSuccess(res, JSON.stringify(result));
              }

              MongoUtil.disConnect(client);
            });
          })
          .catch((err) => {
            console.log('/stock-list err:', err);
            responseErr(res, 10001);
          });
      } else if (req.path == '/daily-stock') {
        const symbol = req.query && req.query.symbol || '';
        if (!symbol) {
          responseErr(res, 10001);
          return;
        }
        MongoUtil.getClient('node-stock')
          .then((client) => {
            const db = client.db('node-stock');

            // 从stocks里查询stock信息
            const p1 = new Promise((resolve, reject) => {
              db.collection('stocks').findOne({ "symbol": symbol }, (err, result) => {
                if (err || !result) {
                  reject(err);
                  return;
                }

                resolve(result);
              });
            });

            // 从daily-stocks里查询stock信息
            const p2 = new Promise((resolve, reject) => {
              db.collection('daily-stocks').findOne({ "symbol": symbol }, (err, result) => {
                if (err || !result || !result.data) {
                  reject(err);
                  return;
                }

                resolve(result.data);
              });
            });

            return Promise.all([p1, p2]);
          })
          .then((result) => {
            responseSuccess(res, JSON.stringify({
              info: result[0],
              data: result[1]
            }));
          })
          .catch((err) => {
            console.log('/stock-list err:', err);
            responseErr(res, 10001);
          });
      } else if (req.path == '/stk-tick') {
        const ts_code = req.query && req.query.ts_code || '';
        const date = req.query && req.query.date || '';
        if (!ts_code || !date) {
          responseErr(res, 10001, "param err: not found ts_code or date");
          return;
        }

        MongoUtil.getClient('node-stock')
          .then((client) => {
            const db = client.db('node-stock');
            const collection = db.collection(`stk_tick_${date}`);
            collection.find({ ts_code }).toArray((err, result) => {
              if (err || !result || !result.length || !result.length[0].data) {
                console.log('/stock-list err:', err);
                responseErr(res, 10002);
              } else {
                responseSuccess(res, result.length[0].data);
              }

              MongoUtil.disConnect(client);
            });
          })
          .catch((err) => {
            console.log('/stock-list err:', err);
            responseErr(res, 10001);
          });
      } else {
        responseErr(res, 10000);
      }
    } catch (err) {
      console.log(`${req.url} err: ${err}`);
      responseErr(res, 20000);
    }
  }
};