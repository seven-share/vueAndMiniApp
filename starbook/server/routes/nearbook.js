var express = require('express');
var request = require('request');
var async = require('async');
var router = express.Router();
var userModel = require('../models/user.server.js');
var bookModel = require('../models/book.server.js');
//POST /nearbook
router.post('/', function(req, res, next) {
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    userModel.getNearUser(longitude, latitude)
        .then(function(result) {
            var back = result;


            back.forEach(function(element, index) {
                async.map(element.ISBN, function(item, callback) {
                    bookModel.getBookDetail(item)
                        .then(function(r) {
                            callback(null, r);
                        })
                        .catch(function(err) {
                            console.log(err);
                        })

                }, function(err, r) {
                    console.log(r);
                    element.ISBN = r;
                    if (index + 1 == back.length) {
                        res.send(back);
                    }
                })
            })







            // back.forEach(function(element, index) {
            //     console.log(index);
            //     var uri = 'https://api.douban.com/v2/book/isbn/';
            //     element.book.forEach(function(e, i) {
            //         var info = "";
            //         request(uri + e + '?fields=title,author,images,publisher', function(error, response, body) {
            //             if (!error && response.statusCode == 200) {
            //                 // console.log(body);
            //                 info = JSON.parse(body);
            //                 // console.log(info);
            //                 // back[index].book[i] = info;
            //                 // console.log(back);
            //                 // console.log("##############")
            //             }
            //         })
            //         back[index].book[i] = info;
            //     });
            //     // if (index + 1 == back.length) {
            //     //     res.send(back);

            //     // }
            // })
            // var s = bookModel.getBookDetail(9787505715660);
            // console.log(s);
            // res.send(result);
        })

});


// var url = 'https://api.douban.com/v2/book/isbn/';
// var ISBN = 9787505715660;
// var i = request(url + ISBN + '?fields=title,author,images,publisher', function(error, response, body) {
//     if (!error && response.statusCode == 200) {
//         var info = JSON.parse(body);
//         return info;
//     }
// });
// console.log(i);



module.exports = router;