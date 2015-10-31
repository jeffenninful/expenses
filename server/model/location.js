var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationModel = new Schema({
    code: {type: String},
    name: {type: String},
    active: {type: Boolean, default: true}
});

module.exports = mongoose.model('Location', locationModel);

