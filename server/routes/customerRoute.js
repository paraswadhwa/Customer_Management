'use strict';

var customerCtrl = require('../controllers/customerCtrl');

module.exports = function(app) {

    app.get('/fetchCustomers', function(req, res) {
        if (req.query) {
            customerCtrl.fetchCustomers().then(function(data) {
                res.send(data);
            });
        } else {
            res.send('error in fetching data');
        }
    });

    app.get('/fetchCustomerDetails', function(req, res) {
        if (req.query) {
            customerCtrl.fetchCustomerDetails().then(function(data) {
                res.send(data);
            });
        } else {
            res.send('error in fetching data');
        }
    });

    app.get('/searchCustomer', function(req, res) {
        if (req.query.id) {
            customerCtrl.searchCustomer(req.query.id).then(function(data) {
                res.send(data);
            });
        } else {
            res.send('error in fetching data');
        }
    });

    app.get('/fetchCustomerByEmail', function(req, res) {
        if (req.query.id) {
            customerCtrl.fetchCustomerByEmail(req.query.id).then(function(data) {
                res.send(data);
            });
        } else {
            res.send('error in fetching data');
        }
    });

    app.post('/deleteCustomer', function(req, res) {
        if (req.body) {
            var requestData = req.body;
            customerCtrl.deleteCustomer(requestData).then(function(data) {
                var obj = { 'err': null, 'result': null };
                if (!data.err) {
                    obj.result = "Customer deleted";
                } else {
                    obj.err = data.err;
                }
                res.send(obj);
            });
        } else {
            console.log('error');
        }
    });

    app.post('/saveCustomer', function(req, res) {
        if (req.body) {
            var requestData = req.body;
            customerCtrl.saveCustomer(requestData).then(function(data) {
                var obj = { 'err': null, 'result': null };
                if (!data.err) {
                    obj.result = data.result;
                } else {
                    obj.err = data.err;
                }
                res.send(obj);
            });
        } else {
            console.log('error');
        }
    });
}