var carrier = require('carrier');
var config = require('./config.js');
var fs = require('fs');
var path = require('path');

var wordFilter = /^[a-z]{0,7}$/;

function filterWord(word) {
  if(word.frequency < 2) return false;
  if(!wordFilter.test(word.word)) return false;
  return true;
}

function parseIndex(file, callback) {
  var fileName = path.resolve(__dirname, '..', config.dictionary.directory, file);
  var fileStream = fs.createReadStream(fileName);
  var words = [];
  
  carrier.carry(fileStream, function(line) {
    // Ignore comments
    if(line.charAt(0) == ' ') return;
    var params = line.split(' ');
    var word = {};
    word.word = params[0]; // lemma
    word.type = params[1]; // pos
    word.synset = params[2] | 0; // synset_cnt
    var pointerCnt = params[3] | 0; // p_cnt
    word.pointers = params.slice(4, 4 + pointerCnt);
    word.frequency = params[5 + pointerCnt] | 0; // tagsense_cnt
    if(!filterWord(word)) return;
    words.push(word.word);
  });
  fileStream.on('end', function() {
    if(callback) callback(words);
  });
}

function getRand(arr) {
  return arr[arr.length * Math.random() | 0];
}

function checkCallback(nouns, verbs, adjs, callback) {
  if(!(nouns && verbs && adjs)) return;
  if(callback) callback(nouns, verbs, adjs);
}

module.exports = function(callback) {
  var nouns, verbs, adjs;
  parseIndex(config.dictionary.index.noun, function(words) {
    nouns = words;
    checkCallback(nouns, verbs, adjs, callback);
  });
  parseIndex(config.dictionary.index.verb, function(words) {
    verbs = words;
    checkCallback(nouns, verbs, adjs, callback);
  });
  parseIndex(config.dictionary.index.adj, function(words) {
    adjs = words;
    checkCallback(nouns, verbs, adjs, callback);
  });
}

if(require.main === module) {
  module.exports();
}
