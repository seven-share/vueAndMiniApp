var recordModel = require('../lib/mongoose.js').recordModel;
var bookModel = require('../lib/mongoose.js').bookModel;
var request = require('request');
module.exports = {
    //分享图书
    create: function(record) {
        return new Promise(function(resolve, reject) {
            recordModel.create(record, function(err, doc) {
                if (err) {
                    reject(err);
                } else {
                    var _id = doc._id;
                    var bookId = _id.toString().substring(18, 24);
                    recordModel.update({ _id: _id }, {
                        $set: { bookId: bookId }
                    }, function(err, doc) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(doc);
                        }
                    })
                }
            })
        })
    },
    //保存豆瓣信息
    savedouban: function(saveBook) {
        return new Promise(function(resolve, reject) {
            bookModel.create(saveBook, function(err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            })
        })
    },


    //获取他人图书
    getbook: function(bookId, openid) {
        return new Promise(function(resolve, reject) {
            recordModel.findOne({ bookId: bookId }, function(err, doc) {
                if (err) {
                    reject(err);
                } else {
                    recordModel.update({ bookId: bookId }, { inHand: false }, { multi: true }, function(err, doc) {
                        if (err) {
                            reject(err);
                        }
                    });
                    var ISBN = doc.ISBN;
                    var bookTitle = doc.bookTitle;
                    var getBookMessage = {
                        openid: openid,
                        ISBN: ISBN,
                        bookTitle: bookTitle,
                        bookId: bookId,
                        inHand: true
                    }
                    recordModel.create(getBookMessage, function(err, doc) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(doc);
                        }
                    })
                }
            })
        })
    },



    //添加心得
    addNewFeel: function(openid, ISBN, feel) {
        return new Promise(function(resolve, reject) {
            recordModel.update({ openid: openid, ISBN: ISBN }, {
                '$set': { 'feelTitle': feel.title, 'feelDetail': feel.detail }
            }, function(err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            })
        })
    },
    //获取图书详情
    getBookDetail: function(ISBN) {
        return new Promise(function(resolve, reject) {
            bookModel.findOne({ ISBN: ISBN }, { bookTitle: 1, author: 1, image: 1, publisher: 1, _id: 0 }, function(err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            })
        })
    },

    //获取一本书的书途
    getOneBookRoad: function(bookId) {
        return new Promise(function(resolve, reject) {
            recordModel.find({ bookId: bookId }).sort({ '_id': -1 })
                .exec(function(err, doc) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(doc);
                    }
                })
        })
    }
}