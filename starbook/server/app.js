var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes/index.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);
app.listen(3000, function() {
    console.log('success http://localhost:3000');
})