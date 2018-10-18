import MongoUtil from '../../utils/MongoUtil.js';

function responseErr(errCode) {
    res.writeHead(200, {'content-type': 'application/json'});
    res.end(JSON.stringify({
        err_code: errCode,
        msg: "server error",
        result: null
    }));    
}

function responseSuccess(result) {
    res.writeHead(200, {'content-type': 'application/json'});
    res.end(JSON.stringify({
        err_code: 0,
        msg: "",
        result: result
    }));    
}

module.exports = {
    onRequest(req, res) {
        if (req.url == '/stocl-list') {
            MongoUtil.getClient('node-stock')
            .then((client)=> {
                const db = client.db('node-stock');
                const collection = db.collection('stocks');
                collection.find({}).toArray((err, result) => {
                    if (err) {
                        console.log('/stocl-list err:', err);
                        responseErr(10002);
                    } else {
                        responseSuccess(JSON.stringify(result));
                    }

                    MongoUtil.disConnect(client);
                });
            })
            .catch((err) => {
                console.log('/stocl-list err:', err);
                responseErr(10001);
            });
        } else {
            responseErr(10000);
        }
    }
};