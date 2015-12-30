var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expenseModel = new Schema({
    userId: {type: String},
    managerId: {type: String},
    date: {type: Date},
    expenseDate: {type: Date},
    submittedDate: {type: Date, default: new Date()},
    category: {type: String},
    description: {type: String},
    amount: {type: String},
    billable: {type: Boolean},
    projectCode: {type: String},
    status: {type: String, default: 'pending'},
    receipt: [
        {type: String}
    ]
});

module.exports = mongoose.model('Expense', expenseModel);
