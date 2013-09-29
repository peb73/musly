
/**
 * Module dependencies.
 */

require('./response');
var fs = require('fs');
var CONFIG = require('config').TinyURL;

var express = require('express')
  , app = module.exports = express()
  , routes = require('./routes')
  , path = require('path');

var date = new Date();

//create log folder
fs.exists('./log',function(exists){
  if(!exists)
    fs.mkdir("./log");
});

var logFile = fs.createWriteStream('./log/access.'+date.getFullYear()+"."+(1+date.getMonth())+"."+date.getDate()+'.log', {flags: 'a'});

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger({stream: logFile}));
  //app.use(express.logger('dev'));
  app.use(express.compress());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

});

app.configure('development', function () {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
  app.use(express.errorHandler({}));
});

app.get('/', routes.index);

//Montage de l'api REST sur /
app.use('/', app.bookmarks_app = require('./tinyURL-restAPI')());

if (module.parent === null) {
  app.listen(CONFIG.appPort);
  //console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
  console.log("Express server start");
}