module.exports = function(app) {
    app.get('/', function(req, res) {
        res.send('这是主页')
    });
    app.use('/register', require('./register'));
    app.use('/sharebook', require('./sharebook'));
    app.use('/getbook', require('./getbook'));
    app.use('/addfeel', require('./addfeel'));
    app.use('/nearbook', require('./nearbook'));
    app.use('/mybook', require('./mybook'));
    app.use('/onebookroad', require('./onebookroad'));
};