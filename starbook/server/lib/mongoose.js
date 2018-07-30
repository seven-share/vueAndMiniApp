var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/starbook');
var Schema = mongoose.Schema;

//用户数据结构
var userSchema = new Schema({
    openid: String,
    phoneNum: String,
    avatarUrl: String,
    nickName: String,
    score: {
        type: Number,
        default: 0
    },
    location: {
        type: [Number],
        index: {
            type: '2dsphere',
            sparse: true
        }
    }
});
exports.userModel = mongoose.model('users', userSchema);

//图书数据结构
var recordSchema = new Schema({
    openid: String,
    bookId: String,
    bookTitle: String,
    ISBN: String,
    feelTitle: String,
    feelDetail: String,
    inHand: Boolean,
    time: { type: Date, default: new Date() }
});

exports.recordModel = mongoose.model('records', recordSchema);

//获取豆瓣数据并储存
var bookSchema = new Schema({
    ISBN: {
        type: String,
        unique: true
    },
    bookTitle: String,
    author: String,
    image: String,
    publisher: String
})

exports.bookModel = mongoose.model('books', bookSchema);