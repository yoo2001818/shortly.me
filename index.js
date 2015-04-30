var config = require('./lib/config.js');
var importer = require('./lib/importer.js');
var express = require('express');
var serveStatic = require('serve-static');

function toIngVerb(word) {
  if(/(ss|x|ch|sh|o)$/.test(word)) return word+'es';
  if(/y$/.test(word)) return word.slice(0, -1)+'ies';
  return word+'s';
  /*if(/e$/.test(word)) return word.slice(0, -1)+'ing';
  return word+'ing';*/
}

function to3rdVerb(word) {
  /*if(/(ss|x|ch|sh|o)$/.test(word)) return word+'es';
  if(/y$/.test(word)) return word.slice(0, -1)+'ies';
  return word+'s';*/
  if(/e$/.test(word)) return word.slice(0, -1)+'ing';
  return word+'ing';
}

function getRand(arr) {
  return arr[arr.length * Math.random() | 0];
}

function testWords() {
  for(var i = 0; i < 10; ++i) {
    console.log(getRand(adjs).word, getRand(nouns).word);
  }
}

var app = express();

importer(function(nouns, verbs, adjs) {
  app.all('/generate/:pattern?', function(req, res, next) {
    var pattern = req.params.pattern || 'an';
    var patterns = pattern.split('');
    var results = [];
    for(var i = 0; i < 10; ++i) {
      results.push(patterns.map(function(v) {
        switch(v) {
          case 'a':
            return getRand(adjs).word;
          case 'n':
            return getRand(nouns).word;
          case 'v':
            return getRand(verbs).word;
          case 'V':
            return toIngVerb(getRand(verbs).word);
          case 'w':
            return to3rdVerb(getRand(verbs).word);
          default:
            return 'unknown';
        }
      }).join(' '))
    }
    res.type('text/plain');
    res.send(results.join('\n'));
  });
  app.use(new serveStatic('./public'));
  app.listen(8000);
  console.log('Server started');
});
