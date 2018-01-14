'use strict'
var customerService = require('../services/customerService');

exports.fetchCustomers = function() {
    return customerService.fetchCustomers();
}

exports.fetchCustomerByEmail = function(id) {
    return customerService.fetchCustomerByEmail(id);
}

exports.searchCustomer = function(id) {
    return customerService.searchCustomer(id);
}

exports.saveCustomer = function(data) {
    data.DOB = new Date();
    return customerService.saveCustomer(data);
}

exports.deleteCustomer = function(data) {
    return customerService.deleteCustomer(data);
}

exports.fetchCustomerDetails = function() {
    return customerService.fetchCustomerDetails();
}