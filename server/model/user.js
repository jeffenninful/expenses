var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userModel = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    password: {type: String},
    dateJoined: {type: Date},
    active: {type: Boolean, default: true},
    location: {type: String},
    branchCode: {type: String},
    role: {type: String},
    projects: [{type: String}],
    manages: [{type: String}],
    managedBy: [{type: String}]
});

module.exports = mongoose.model('User', userModel);

