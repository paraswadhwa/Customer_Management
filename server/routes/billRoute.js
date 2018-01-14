'use strict';

var billCtrl = require('../controllers/billCtrl');

module.exports = function(app) {

    app.get('/createDefaultBills', function(req, res) {
        if (req.query) {
            billCtrl.createDefaultBills().then(function(data) {
                res.send(data);
            });
        } else {
            res.send('error in fetching data');
        }
    });
}