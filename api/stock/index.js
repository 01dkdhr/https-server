const MongoUtil = require('../../utils/MongoUtil.js');
const timeUtil = require('../../utils/timeUtil.js');

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
  async onRequest(req, res) {
    try {
      if (req.path == '/stk-tick') {
        // {
        //   ts_code: "000001.SZ",
        //   date: "20181213",
        //   time_filter: encodeURIComponent(JSON.stringify([" 09:1", " 09:2", " 09:3", " 09:40"]))
        // }
        const ts_code = req.query && req.query.ts_code || '';
        const date = req.query && req.query.date || '';
        if (!ts_code || !date) {
          responseErr(res, 10001, "param err: not found ts_code or date");
          return;
        }

        const result = await MongoUtil.getDatas({
          dbName: 'tushare-stock',
          tableName: `stk_tick_${date}`,
          filter: { ts_code } 
        });

        if (!result || !result.length || !result[0].data) {
          console.log('/stk-tick err: result is empty');
          responseErr(res, 10002);
        } else {
          const time_filter = req.query && req.query.time_filter || '';
          if (time_filter) {
            try {
              const filter = JSON.parse(decodeURIComponent(time_filter));
              const len = filter.length;
              if (len) {
                const dataArr = result[0].data.split('\r\n');
                const newResult = [];

                dataArr.forEach((item) => {
                  for (let i = 0; i < len; ++i) {
                    if (item.indexOf(filter[i]) >= 0) {
                      newResult.push(item);
                      break;
                    }
                  }
                });

                responseSuccess(res, newResult.join('\r\n'));
                return;
              }
            } catch (err) {
              console.log('/stk-tick err:', err);
              responseErr(res, 10002);
              return;
            }
          } 

          responseSuccess(res, result[0].data);
        }
      } else if (req.path == '/trade-date') {
        let date = await timeUtil.recentTradeDay(req.query && req.query.date || timeUtil.todayStr());
        const type = req.query && req.query.type || '';
        if (type == 'pre') {
          date = await timeUtil.preTradeDay(date);
        } else if (type == 'next') {
          date = await timeUtil.nextTradeDay(date);  
        }

        responseSuccess(res, date);
      } else {
        responseErr(res, 10000);
      }
    } catch (err) {
      console.log(`${req.url} err: ${err}`);
      responseErr(res, 20000);
    }
  }
};