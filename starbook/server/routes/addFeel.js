var express = require('express');
var router = express.Router();
var bookModel = require('../models/book.server.js');

//POST /addfeel
router.post('/', function(req, res, next) {
    var openid = req.body.openid;
    var ISBN = req.body.ISBN;
    var feel = {};
    feel.title = req.body.feelTitle;
    feel.detail = req.body.feelDetail;
    bookModel.addNewFeel(openid, ISBN, feel)
        .then(function(result) {
            res.send(result);
        })
});



module.exports = router;