var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userModel = new Schema({
  userName: {type: String},
  firstName: {type: String},
  middleName: {type: String},
  lastName: {type: String},
  email: {type: String},
  password: {type: String},
  active: {type: Boolean, default: true},
  branch: {type: String},
  branchCode: {type: String},
  role: {type: String},
  projects: [{type: String}],
  manages: [{type: String}],
  managedBy: [{type: String}]
});

module.exports = mongoose.model('User', userModel);

