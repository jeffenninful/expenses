var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionModel = new Schema({
    _id: {type: String, required: true},
    token: {type: String, required: true},
    expiration: {type: String, required: true}
});

module.exports = mongoose.model('Session', SessionModel);
