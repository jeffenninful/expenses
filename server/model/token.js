var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tokenModel = new Schema({
  userId: {type: String, required: true},
  value: {type: String, required: true},
  expirationDate: {type: Date}
});

module.exports = mongoose.model('Token', tokenModel);

