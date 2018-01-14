'use strict'

var customer = require('../models/customerSchema');
var bill = require('../models/billSchema');
var Q = require('q');

exports.fetchCustomers = function() {
    var deferred = Q.defer();
    customer.find().exec(function(err, result) {
        deferred.resolve({
            err: err,
            result: result
        });
    });
    return deferred.promise;
}

exports.searchCustomer = function(id) {
    var deferred = Q.defer();
    customer.find({ $or: [{ "Name": { "$regex": id, "$options": "i" } }, { "Mobile": { "$regex": id, "$options": "i" } }, { "Phone": { "$regex": id, "$options": "i" } }] }).exec(function(err, result) {
        deferred.resolve({
            err: err,
            result: result
        });
    });
    return deferred.promise;
}

exports.fetchCustomerByEmail = function(id) {
    var deferred = Q.defer();
    customer.findOne({ Email: id }).exec(function(err, result) {
        deferred.resolve({
            err: err,
            result: result
        });
    });
    return deferred.promise;
}

exports.saveCustomer = function(data) {
    // same function will save and updated customer
    var deferred = Q.defer();
    customer.findOne({ Email: data.Email }).exec(function(err, doc) {
        if (doc) {
            customer.findOneAndUpdate({ Email: data.Email }, { $set: data }).exec(function(err, doc) {
                deferred.resolve({
                    err: err,
                    result: "Customer updated successfully."
                });
            });
        } else {
            var customers = new customer(data);
            customers.save(function(err, doc) {
                deferred.resolve({
                    err: err,
                    result: "Customer added successfully."
                });
            });
        }
    });

    return deferred.promise;
}

exports.deleteCustomer = function(data) {
    var deferred = Q.defer();
    customer.deleteOne({ Email: data.email }).exec(function(err, doc) {
        deferred.resolve({
            err: err,
            result: doc
        });
    });
    return deferred.promise;
}

exports.fetchCustomerDetails = function() {
    // aggregation used to fetch customer data from bill on the basis of customer if field in bill schema
    var deferred = Q.defer();
    customer.aggregate([{
        $lookup: {
            from: 'bills',
            localField: "_id",
            foreignField: "CustomerId",
            as: "billDetails"
        }
    }]).exec(function(err, result) {
        deferred.resolve(result);
    });
    return deferred.promise;
}