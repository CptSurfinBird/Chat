var express = require("express");
var http = require("http");
var bodyParser = require('body-parser');
var db = require("./db.js");

var app = express();
var server = app.listen(3000, '0.0.0.0', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log(new Date() + ': Running on http://%s:%s \n\n', host, port);
});

app.use(bodyParser.urlencoded({ extended: true }));
//Our API
app.get('/api/getMessages',db.getMessages);
app.post('/api/postMessage',db.postMessage);
