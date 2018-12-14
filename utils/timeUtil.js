const MongoUtil = require('./MongoUtil.js');

const oneDayLong = 24*60*60*1000;

module.exports = {
  getDateFromStr(formatDay) {
    const year = parseInt(formatDay.slice(0, 4));
    const month = parseInt(formatDay.slice(4, 6));
    const day = parseInt(formatDay.slice(6, 8));
    return new Date(year, month -1, day);
  },
  todayStr() {
    // 获取当天的年月日: 20181001
    let date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}${month < 10 ? ('0' + month) : (month)}${day < 10 ? ('0' + day) : (day)}`;
  },
  async recentTradeDay(formatDay) {
    const result = await MongoUtil.getDatas({ 
      dbName: 'tushare-stock',
      tableName: "trade_calendar", 
      filter: { cal_date: formatDay } 
    });
    if (result && result.length) {
      if (result[0].is_open || (result[1] && result[1].is_open)) {
        return formatDay;
      }

      const day1 = result[0].pretrade_date;
      const day2 = (result[1] && result[1].pretrade_date) || 0;
      return parseInt(day1) > parseInt(day2) ? day1 : day2;
    }

    return formatDay;
  },
  async preTradeDay(formatDay) {
    const result = await MongoUtil.getDatas({ 
      dbName: 'tushare-stock',
      tableName: "trade_calendar", 
      filter: { cal_date: formatDay } 
    });

    if (result && result.length) {
      return result[0].pretrade_date;  
    } else {
      return formatDay;
    }
  },
  async nextTradeDay(formatDay) {
    const result = await MongoUtil.getDatas({ 
      dbName: 'tushare-stock',
      tableName: "trade_calendar", 
      filter: { pretrade_date: formatDay } 
    });

    if (result && result.length) {
      let num = parseInt(result[0].cal_date);
      for (let i = 1; i < result.length; ++i) {
        if (parseInt(result[i].cal_date) > num) {
          num = parseInt(result[i].cal_date);  
        }
      }

      return num + '';
    } else {
      return formatDay;
    }
  },
  getFirstDayOfWeek(formatDay) {
    // 通过字符串如"20181001"获取该周的周一
    if (!formatDay || formatDay.length !== 8) {
      return null;
    }

    let year, month, day;

    const date = this.getDateFromStr(formatDay);

    const time = date.getTime() ; 
    day = date.getDay();
    const monday = new Date(time - (day-1) * oneDayLong);

    year = monday.getFullYear();
    month = monday.getMonth() + 1;
    day = monday.getDate();

    return `${year}${month < 10 ? ('0' + month) : (month)}${day < 10 ? ('0' + day) : (day)}`
  }
};