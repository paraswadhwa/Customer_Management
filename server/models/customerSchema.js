var mongoose = require('./mongoose').getMongoose();
var Schema = mongoose.Schema;

// create a schema
var customerSchema = new Schema({
    Name: { type: String },
    Mobile: { type: String },
    Phone: { type: String },
    Email: { type: String },
    DOB: { type: Date },
    Addresses: [{
        'Flat': String,
        'Street': String,
        'State': String,
        'PinCode': String
    }]
});

// we need to create a model using it
var Customer = mongoose.model('Customer', customerSchema);

// make this available to our users in our Node applications
module.exports = Customer;