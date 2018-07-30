var userModel = require('../lib/mongoose.js').userModel;
var recordModel = require('../lib/mongoose.js').recordModel;
var async = require('async');
module.exports = {
    //注册用户
    create: function(newUser) {
        return new Promise(function(resolve, reject) {
            userModel.create(newUser, function(err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            })
        })
    },
    //增长积分
    addScore: function(openid, num) {
        return new Promise(function(resolve, reject) {
            userModel.update({ openid: openid }, { '$inc': { 'score': num } }, function(err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            })
        })
    },
    //获取附近的用户
    getNearUser: function(longitude, latitude) {
        return new Promise(function(resolve, reject) {
            userModel.find({
                'location': {
                    $nearSphere: [
                        parseFloat(latitude),
                        parseFloat(longitude)
                    ],
                    $maxDistance: 5
                        //除以111.12
                }
            }, { openid: 1, avatarUrl: 1, nickName: 1, _id: 0 }).limit(20).skip(0).lean().exec(function(err, doc) {
                if (err) {
                    reject(err);
                } else {
                    var user = doc;
                    async.map(user, function(item, callback) {
                        recordModel.find({ openid: item.openid, inHand: true }, { ISBN: 1, _id: 0 }, function(err, doc) {
                            if (err) {
                                reject(err);
                            } else {
                                var ISBN = [];
                                doc.forEach(function(element) {
                                    ISBN.push(element.ISBN);
                                })
                                var a = {
                                    u: item,
                                    ISBN: ISBN
                                };
                                callback(null, a)
                            }
                        })
                    }, function(err, result) {
                        resolve(result);
                    })




                    // var all = [];
                    // user.forEach(function(element, index) {
                    //     bookModel.find({ openid: element.openid }, { ISBN: 1, inHand: 1, _id: 0 }, function(err, doc) {
                    //         if (err) {
                    //             reject(err);
                    //         } else {
                    //             var n = [];
                    //             doc.forEach(function(e) {
                    //                 if (e.inHand) {
                    //                     n.push(e.ISBN);
                    //                     // console.log(n);
                    //                 }
                    //             })
                    //             var a = {
                    //                 u: element,
                    //                 book: n
                    //             };
                    //             all.push(a);
                    //             if (index + 1 == user.length) {
                    //                 resolve(all);
                    //             }
                    //         }
                    //     })
                    // })
                }
            });
        })
    },

    getPersonDetail: function(openid) {
        return new Promise(function(resolve, reject) {
            userModel.findOne({ openid: openid }, { avatarUrl: 1, nickName: 1, _id: 0 }, function(err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            })
        })
    }
}


//获取附近用户其他代码
// userModel.find().where('loc').near({ center: [latitude, longitude], maxDistance: 5 })
//     .exec(function(err, doc) {
//         if (err) {
//             reject(err);
//         } else {
//             resolve(doc);
//         }
//     })