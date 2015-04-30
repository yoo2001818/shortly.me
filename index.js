var config = require('./lib/config.js');
var generator = require('./lib/generator.js');
var db = require('./lib/db.js');
var express = require('express');
var serveStatic = require('serve-static');

var app = express();

generator.prepare(function() {
  app.all('/generate/:pattern?', function(req, res, next) {
    var pattern = req.params.pattern || 'an';
    var results = [];
    for(var i = 0; i < 10; ++i) {
      results.push(generator.generate(pattern, ' '));
    }
    res.type('text/plain');
    res.send(results.join('\n'));
  });
  app.get('/shorten', function(req, res, next) {
    var original = req.query.url;
    if(original == null) {
      res.sendStatus(400);
      return;
    }
    db.queryByUrl(original, function(originEntry, err) {
      if(originEntry) {
        res.send(config.domain+originEntry.shorten);
        return;
      }
      generator.generatePatternUnique('-', 20, function(word, callback) {
        db.query(word, function(entry, err) {
          callback(!entry);
        });
      }, function(word) {
        db.add(word, original, function(entry, err) {
          if(err) {
            res.sendStatus(500);
            return;
          }
          res.send(config.domain+word);
        });
      });
    });
  });
  app.get('/:shorten', function(req, res, next) {
    var shorten = req.params.shorten;
    db.query(shorten, function(entry, err) {
      if(!entry) {
        next();
        return;
      }
      res.redirect(entry.original);
    });
  });
  app.use(new serveStatic('./public'));
  app.listen(config.port);
  console.log('Server started');
});
