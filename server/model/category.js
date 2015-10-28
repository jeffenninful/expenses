var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoryModel = new Schema({
  name: {type: String},
  active: {type: Boolean, default: true}
});

module.exports = mongoose.model('Category', categoryModel);

