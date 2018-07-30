var express = require('express');
var bookModel = require('../models/book.server.js');
var userModel = require('../models/user.server.js');
var async = require('async');
var router = express.Router();

//POST /onebookroad
router.post('/', function(req, res, next) {
    var bookId = req.body.bookId;
    bookModel.getOneBookRoad(bookId)
        .then(function(result) {
            var back = result;
            async.map(back, function(item, callback) {
                userModel.getPersonDetail(item.openid)
                    .then(function(r) {
                        item.openid = r;
                        bookModel.getBookDetail(item.ISBN)
                            .then(function(r) {
                                item.ISBN = r;
                                callback(null, back);
                            })

                    });
            }, function(err, r) {
                res.send(r);
            })
        })
});







module.exports = router;