var express = require('express');
var router = express.Router();
var moment = require('moment');
var userModel = require('../models/user.server.js');
var bookModel = require('../models/book.server.js');
//POST /sharebook 第一个分享图书
router.post('/', function(req, res, next) {
    var openid = req.body.openid;
    var ISBN = req.body.ISBN;
    var bookTitle = req.body.bookTitle;

    var author = req.body.author;
    var image = req.body.image;
    var publisher = req.body.publisher;

    var record = {
        openid: openid,
        ISBN: ISBN,
        bookTitle: bookTitle,
        inHand: true
    };
    var saveBook = {
        ISBN: ISBN,
        bookTitle: bookTitle,
        author: author,
        image: image,
        publisher: publisher
    };
    bookModel.savedouban(saveBook)
        .catch(function(err) {
            console.log(err);
        })
    bookModel.create(record)
        .then(function(result) {
            userModel.addScore(openid, 30)
                .then(function(result) {
                    res.send(true);
                })
        })

});







module.exports = router;