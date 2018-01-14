var mongoose = require('./mongoose').getMongoose();
var Schema = mongoose.Schema;

// create a schema
var counterSchema = new Schema({
    _id: { type: String },
    seq: { type: Number }
});

// we need to create a model using it
var Counter = mongoose.model('Counter', counterSchema);

// make this available to our users in our Node applications
module.exports = Counter;