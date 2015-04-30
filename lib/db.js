var config = require('./config.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Currently it only supports MongoDB; But I decided to put some abstraction.

mongoose.connect(config.database);

var urlSchema = new Schema({
  shorten: String,
  original: String
});

var URLModel = mongoose.model('URLModel', urlSchema);

module.exports.add = function(shorten, original, callback) {
  URLModel.create({
    shorten: shorten,
    original: original
  }, function(err, entry) {
    if(err && callback) callback(null, err);
    if(callback) callback(entry);
  });
}

module.exports.query = function(shorten, callback) {
  URLModel.findOne({
    shorten: shorten
  }).exec(function(err, entry) {
    if(err && callback) callback(null, err);
    if(callback) callback(entry);
  });
}

module.exports.queryByUrl = function(original, callback) {
  URLModel.findOne({
    original: original
  }).exec(function(err, entry) {
    if(err && callback) callback(null, err);
    if(callback) callback(entry);
  });
}
