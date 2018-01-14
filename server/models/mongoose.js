'use strict';
let mongoose = require('mongoose');

exports.init = function() {
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error'));

    db.once('open', function() {
        console.log("connected to mongo db");
    });

    mongoose.connect('mongodb://localhost/customerManagement');
    return mongoose;
}

exports.getMongoose = function() {
    return mongoose;
}