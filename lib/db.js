var config = require('./config.js').database;
var Sequelize = require('sequelize');

var sequelize = new Sequelize(config.database, config.username, config.password, config);

var URLModel = sequelize.define('shortlyModel', {
  shorten: Sequelize.STRING,
  original: Sequelize.STRING
});

URLModel.sync();

module.exports.add = function(shorten, original, callback) {
  URLModel.create({
    shorten: shorten,
    original: original
  })
  .then(function(entry) {
    if(callback) callback(entry);
  }, function(err) {
    if(callback) callback(null, err);
  });
}

module.exports.query = function(shorten, callback) {
  URLModel.findOne({
    where: {
      shorten: shorten
    }
  })
  .then(function(entry) {
    if(callback) callback(entry);
  }, function(err) {
    if(callback) callback(null, err);
  });
}

module.exports.queryByUrl = function(original, callback) {
  URLModel.findOne({
    original: original
  })
  .then(function(entry) {
    if(callback) callback(entry);
  }, function(err) {
    if(callback) callback(null, err);
  });
}
