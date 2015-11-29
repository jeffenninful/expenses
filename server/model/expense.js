var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expenseModel = new Schema({
    user: {type : String},
    date: {type: Date},
    category: {type: String},
    description: {type: String},
    amount: {type: String},
    status: {type: String, default: 'pending'},
    receipt: {type: Boolean},
    billable: {type: Boolean},
    projectCode: {type: String}
});

module.exports = mongoose.model('Expense', expenseModel);
