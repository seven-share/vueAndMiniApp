var express = require('express');
var async = require('async');
var router = express.Router();
var userModel = require('../models/user.server.js');
var request = require('request');

const APP_ID = 'wx1ed9ac6f29a707c1'
const APP_SECRET = 'c8d90a85afa55a46a940d94a3592fc3e'

var getOpenid = function(code, callback) {
        const url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' +
            APP_ID + '&secret=' + APP_SECRET + '&js_code=' + code +
            '&grant_type=authorization_code';
        request(url, function(err, response, body) {
            if (!err && response.statusCode == 200) {
                const data = JSON.parse(body)
                console.log("[openid]", data.openid);
                console.log("[session_key]", data.session_key);
                callback(null, data);
            }

        })
    }
    //GET /getopenid
    // router.post('/', function(req, res, next) {
    //     console.log(req.body);
    //     var code = req.body.code;
    //     console.log(code);
    //     getOpenid(code, function(err, data) {
    //         res.send(data.openid);
    //     })
    // })



//POST /register
router.post('/', function(req, res, next) {
    var code = req.body.code;
    getOpenid(code, function(err, data) {
        var openid = data.openid;
        var phoneNum = req.body.phoneNum;
        var avatarUrl = req.body.avatarUrl;
        var nickName = req.body.nickName;
        var latitude = req.body.latitude;
        var longitude = req.body.longitude;
        var newUser = {
            openid: openid,
            phoneNum: phoneNum,
            avatarUrl: avatarUrl,
            nickName: nickName,
            location: [longitude, latitude]
        }
        console.log(newUser);
        userModel.create(newUser)
            .then(function(result) {
                console.log('success');

            })
        res.send(openid);

    })










});







module.exports = router;



// {
//         'openid': 'sdafjk',
//         'phoneNum' : 123213,
//         'latitude' : 12.88
//         'book' : [{
//             'openid': 'sdafjk',
//             'phoneNum' : 123213,
//         }]
// }