'use strict'

var bill = require('../models/billSchema');
var customer = require('../models/customerSchema');
var counter = require('../models/counterSchema');
var Q = require('q');

exports.createDefaultBills = function() {
    return createDefaultCounter()
        .then(function() {
            var chain = Q.when('start');
            for (var i = 0; i < 1000; i++) {
                chain = chain.then(function() {
                    return createData().then(function(res) {
                        return insertData(res);
                    });
                });
            }
            return chain;
        });
}

function createDefaultCounter() {
    // create a default entry in the counter schema
    var deferred = Q.defer();
    counter.find({}).count().exec(function(err, result) {
        if (result == 0) {
            var counters = new counter({ _id: "BillNumber", seq: 0 });
            counters.save(function(err, doc) {
                deferred.resolve();
            });
        } else {
            deferred.resolve();
        }
    });
    return deferred.promise;
}

function getNextSequence() {
    // get next seq value from the counter schema
    var deferred = Q.defer();
    counter.findOneAndUpdate({ _id: "BillNumber" }, { $inc: { 'seq': 1 } }, { new: true }).exec(function(err, result) {
        deferred.resolve(result.seq);
    });
    return deferred.promise;
}

function insertData(data) {
    // save all bill data
    var deferred = Q.defer();
    var bills = new bill(data);
    bills.save(function(err, doc) {
        deferred.resolve();
    });
    return deferred.promise;
}

function fetchItems() {
    // randomly generate 1 to 10 items and create list if items.
    var arr = ['Item1', 'Item2', 'Item3', 'Item4', 'Item5', 'Item6', 'Item7', 'Item8', 'Item9', 'Item10'];
    var x = generateRandomNum(1, 10);
    var Items = [];
    for (var i = 0; i < x; i++) {
        var obj = {};
        obj['name'] = arr[i];
        obj['quantity'] = generateRandomNum(1, 5);
        obj['rate'] = generateRandomNum(2, 10);
        Items.push(obj);
    }
    return Items;
}

function createData() {
    var deferred = Q.defer();
    getNextSequence().then(function(no) {
        findRandomCustomerId().then(function(id) {
            var data = {
                'BillNumber': no,
                'Discount': generateRandomNum(0, 5),
                'Tax': generateRandomNum(0, 5),
                'CustomerId': id,
                'Items': fetchItems()
            }
            deferred.resolve(data);
        });

    });
    return deferred.promise;
}

function generateRandomNum(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function findRandomCustomerId() {
    // dynamically generate customer id from the list of customers available.
    var deferred = Q.defer();
    customer.find({}).count().exec(function(err, count) {
        var r = Math.floor(Math.random() * count);
        customer.find().limit(1).skip(r).exec(function(err, result) {
            deferred.resolve(result[0]._id);
        });
    });
    return deferred.promise;
}