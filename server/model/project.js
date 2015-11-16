var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectModel = new Schema({
  name: {type: String},
  code: {type: String},
  startDate: {type: Date},
  endDate: {type: Date},
  active: {type: Boolean, default: true}
});

module.exports = mongoose.model('Project', ProjectModel);

