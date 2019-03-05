const request = require('request');
const _ = require('lodash');
const localConfig = require('../../local-config.json');

function responseErr(res, errCode, msg) {
  res.writeHead(200, { 'content-type': 'application/json', "Access-Control-Allow-Origin": "*" });
  res.end(JSON.stringify({
    err_code: errCode,
    msg: msg || "server error",
    result: null
  }));
}

function responseSuccess(res, result) {
  res.writeHead(200, {
    'content-type': 'application/json; charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    'transfer-encoding': 'chunked',
    'vary': 'Accept-Encoding'
  });
  res.end(JSON.stringify({
    err_code: 0,
    msg: "",
    result: result
  }));
}

function requestPromise(option) {
  return new Promise((resolve, reject) => {
    request(option, (e, r, b) => {
      resolve(b);
    });
  })
}

module.exports = {
  async onRequest(req, res) {
    try {
      if (req.method == 'POST') {
        const query = _.cloneDeep(req.body);
        if (query.api_name) {
          const body = await requestPromise({
            method: 'POST',
            url: 'http://api.tushare.pro',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            form: JSON.stringify(Object.assign(query, { token: localConfig["tushare-token"] }))
          });

          responseSuccess(res, body);
        } else {
          responseErr(res, 10000);
        }
      } else if (req.method == 'OPTIONS') {
        responseSuccess(res, 200);  
      }
    } catch (err) {
      console.log(`${req.url} err: ${err}`);
      responseErr(res, 20000);
    }
  }
}