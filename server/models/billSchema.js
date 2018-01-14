var mongoose = require('./mongoose').getMongoose();
var Schema = mongoose.Schema;

// create a schema
var billSchema = new Schema({
    BillNumber: { type: Number },
    BillDate: { type: Date, default: Date.now },
    Discount: { type: Number },
    Tax: { type: Number },
    CustomerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
    Items: [{
        'name': String,
        'quantity': Number,
        'rate': Number
    }]
});

// we need to create a model using it
var Bill = mongoose.model('Bill', billSchema);

// make this available to our users in our Node applications
module.exports = Bill;