var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionModel = new Schema({
    _id: {type: String, required: true},
    token: {type: String, required: true},
    startDate: {type: Date, default: new Date()},
    endDate: {type: String}
});

module.exports = mongoose.model('Session', SessionModel);
