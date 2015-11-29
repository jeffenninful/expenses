var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expenseModel = new Schema({
    user: {type: String},
    date: {type: Date},
    submittedDate: {type: Date, default: new Date()},
    category: {type: String},
    description: {type: String},
    amount: {type: String},
    billable: {type: Boolean},
    projectCode: {type: String},
    status: {type: String, default: 'pending'},
    receipt: {data: Buffer, contentType: String, fileName: String}
});

module.exports = mongoose.model('Expense', expenseModel);
