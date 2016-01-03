var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionModel = new Schema({
    _id: {type: String, required: true},
    token: []
});

module.exports = mongoose.model('Session', SessionModel);
