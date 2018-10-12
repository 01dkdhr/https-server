var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();

// 访问微服务
(function routeMicroServes() {
    try {
        var filePath = path.join(__dirname, '../micro_serves');
        var files = fs.readdirSync(filePath);
        files.forEach((file) => {
            var serve = require(path.join(filePath, file));
            if (serve && serve.onRequest) {
                router.get(`/micro-serves/${file}`, function(req, res, next) {
                    serve.onRequest(req, res);
                });
            }
        })
    } catch (err) {
        console.log('routeMicroServes err', err);
    }
}());

module.exports = router;
