var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expenseModel = new Schema({
  expenseDate: {type: Date},
  category: {type: String},
  description: {type: String},
  amount: {type: Number},
  status: {type: String, default: 'pending'},
  billable: {type: Boolean},
  projectCode: {type: String}
});

module.exports = mongoose.model('Expense', expenseModel);
