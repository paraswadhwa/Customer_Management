var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

//body-parser extract the entire body portion of an incoming request and exposes it on req.body.
app.use(bodyParser.urlencoded({ extended: true })); // can use nested objects
app.use(bodyParser.json()); // for json

app.listen(3000, function() {
    console.log('listening on 3000')
});

let mongoose = require('./models/mongoose');
mongoose.init();

var finalPath = path.join(__dirname, '../client');
app.use(express.static(finalPath));

app.get('/', function(req, res) {
    res.sendFile(finalPath + '/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

require('./routes')(app);