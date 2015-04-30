var config = require('./config.js');
var importer = require('./importer.js');
var db = require('./db.js');

var dict = {};

function toIngVerb(word) { // Incomplete
  if(/(ss|x|ch|sh|o)$/.test(word)) return word+'es';
  if(/y$/.test(word)) return word.slice(0, -1)+'ies';
  return word+'s';
}

function to3rdVerb(word) {
  if(/e$/.test(word)) return word.slice(0, -1)+'ing';
  return word+'ing';
}

function getRand(arr) {
  return arr[arr.length * Math.random() | 0];
}

function prepare(callback) {
  importer(function(nouns, verbs, adjs) {
    dict.nouns = nouns;
    dict.verbs = verbs;
    dict.adjs = adjs;
    if(callback) callback();
  });
}

module.exports.prepare = prepare;

module.exports.dict = dict;

function generate(pattern, seperator) {
  var patterns = (pattern || 'an').split('');
  return patterns.map(function(v) {
    switch(v) {
      case 'a': // adjective
        return getRand(dict.adjs);
      case 'n': // noun
        return getRand(dict.nouns);
      case 'v': // verb
        return getRand(dict.verbs);
      case 'V': // verb ~ ing
        return toIngVerb(getRand(dict.verbs));
      case 'w': // verb ~ 3rd singular present
        return to3rdVerb(getRand(dict.verbs));
      default:
        return 'unknown';
    }
  }).join(seperator || ' ');
}

module.exports.generate = generate;

function generateUnique(pattern, seperator, maxTries, filter, callback) {
  var tries = 0;
  var word;
  function handleFilter(result) {
    if(result) {
      if(callback) callback(word);
      return;
    }
    tryNext();
  }
  function tryNext() {
    if(tries > maxTries) {
      if(callback) callback();
      return;
    }
    word = generate(pattern, seperator);
    filter(word, handleFilter);
    tries ++;
  }
  tryNext();
}

module.exports.generateUnique = generateUnique;

function generatePatternUnique(seperator, maxTries, filter, callback) {
  var patterns = config.generator.patterns;
  var index = 0;
  function doNext(word) {
    if(word) {
      if(callback) callback(word);
      return;
    }
    generateUnique(patterns[index], seperator, maxTries, filter, doNext);
    index ++;
    if(index >= paterns.length) {
      if(callback) callback();
    }
  }
  doNext();
}

module.exports.generatePatternUnique = generatePatternUnique;
