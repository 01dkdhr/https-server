var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();

var homePageExists = fs.existsSync(path.join(__dirname, '../public/homepage/index.html'));

/* GET home page. */
router.get('/', function(req, res, next) {
    if (homePageExists) {
        res.redirect('/homepage/index.html');
    } else {
        next();
    }
});

module.exports = router;
