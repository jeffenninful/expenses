var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userModel = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    password: {type: String},
    dateJoined: {type: Date},
    lastLogin: {type: Date},
    department: {type: String},
    projects: [{type: String}],
    manages: [{type: String}],
    managerId: {type: String},
    role: {type: String, default: 'user'},
    active: {type: Boolean, default: true}
});

module.exports = mongoose.model('User', userModel);

