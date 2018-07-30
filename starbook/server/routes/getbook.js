var express = require('express');
var router = express.Router();
var moment = require('moment');
var userModel = require('../models/user.server.js');
var bookModel = require('../models/book.server.js');
//POST /getbook
router.post('/', function(req, res, next) {
    var openid = req.body.openid;
    var bookId = req.body.bookId;
    bookModel.getbook(bookId, openid)
        .then(function(result) {
            res.send(result);
        })
});







module.exports = router;