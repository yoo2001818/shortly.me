var config = require('./lib/config.js');
var generator = require('./lib/generator.js');
var db = require('./lib/db.js');
var express = require('express');
var serveStatic = require('serve-static');

var app = express();

generator.prepare(function(nouns, verbs, adjs) {
  app.all('/generate/:pattern?', function(req, res, next) {
    var pattern = req.params.pattern || 'an';
    var results = [];
    for(var i = 0; i < 10; ++i) {
      results.push(generator.generate(pattern, ' '));
    }
    res.type('text/plain');
    res.send(results.join('\n'));
  });
  app.use(new serveStatic('./public'));
  app.listen(config.port);
  console.log('Server started');
});
