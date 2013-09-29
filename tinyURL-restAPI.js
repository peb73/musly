var express = require('express')
	, m = require('./middleware')
	, rest = require('./routes/url')
	, CONFIG = require('config').TinyURL;

// Instanciated module

module.exports = function () {
	var app = express();
	
	app.configure(function () {
		app.param('id', m.checkIdParameter);
		app.use(m.checkRequestHeaders);
		app.use(express.bodyParser());
		app.use(m.handleBodyParserError);
		app.use(express.methodOverride());
		app.use(app.router);
	});

	app.configure('development', function () {
		app.use(m.errorHandler({"stack": true}));
	});

	app.configure('production', function () {
		app.use(m.errorHandler({}));
	});

	//Routing
	app.post('/',rest.post);
	app.get('/:hash',function(req, res, next){
		var hash = req.params.hash;
		rest.get(req,res,hash);
	});

	return app;
}

 

// Expose dependencies to avoid duplicate modules
exports.express = express;
exports.middlewares = m;

 
// Start when main module
if (module.parent == null) module.exports().listen(CONFIG.appPort);