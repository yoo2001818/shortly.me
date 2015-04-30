var config = require('config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Currently it only supports MongoDB; But I decided to put some abstraction.

mongoose.connect(config.database);

var urlSchema = new Schema({
  shorten: String,
  original: String
});

var URLModel = new mongoose.model('URLModel', urlSchema);

module.exports.add = function(shorten, original, callback) {
  URLModel.create({
    shorten: shorten,
    original: original
  }, function(err, entry) {
    if(err) throw err;
    return entry;
  }
}

module.exports.query = function(shorten, callback) {
  URLModel.find({
    shorten: shorten
  }).exec(function(err, entry) {
    if(err) throw err;
    return entry;
  });
}
