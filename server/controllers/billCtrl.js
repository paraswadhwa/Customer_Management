'use strict'
var billService = require('../services/billService');

exports.createDefaultBills = function() {
    return billService.createDefaultBills();
}