var express = require('express');
var router = express.Router();

//POST /mybook
router.post('/', function(req, res, next) {
    res.send('这是我的图书');
});







module.exports = router;