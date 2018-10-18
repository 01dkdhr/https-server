const MongoUtil = require('../../utils/MongoUtil.js');

function responseErr(res, errCode) {
    res.writeHead(200, {'content-type': 'application/json'});
    res.end(JSON.stringify({
        err_code: errCode,
        msg: "server error",
        result: null
    }));    
}

function responseSuccess(res, result) {
    res.writeHead(200, {'content-type': 'application/json'});
    res.end(JSON.stringify({
        err_code: 0,
        msg: "",
        result: result
    }));    
}

module.exports = {
    onRequest(req, res) {
        if (req.url == '/stock-list') {
            MongoUtil.getClient('node-stock')
            .then((client)=> {
                const db = client.db('node-stock');
                const collection = db.collection('stocks');
                collection.find({}).toArray((err, result) => {
                    if (err) {
                        console.log('/stocl-list err:', err);
                        responseErr(res, 10002);
                    } else {
                        responseSuccess(res, JSON.stringify(result));
                    }

                    MongoUtil.disConnect(client);
                });
            })
            .catch((err) => {
                console.log('/stocl-list err:', err);
                responseErr(res, 10001);
            });
        } else {
            responseErr(res, 10000);
        }
    }
};