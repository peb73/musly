require('./response');

exports.errorHandler = function (options) {
	var log = options.log || console.error
		, stack = options.stack || false
	return function (err, req, res, next) {
		log(err.message);
		if (err.stack) log(err.stack);
		var content = err.message;
		if (stack && err.stack) content += '\n' + err.stack;
		var code = err.code || (err.type == 'ENOTFOUND' ? 404 : 500);
		res.respond(content, code);
	}
}

exports.checkRequestHeaders = function(req, res, next) {
  if (!req.accepts('application/json'))
    return res.respond('You must accept content-type application/json', 406);
  if ((req.method == 'PUT' || req.method == 'POST') && req.header('content-type').search('application/json') < 0 )
    return res.respond('You must declare your content-type as application/json', 406);
  return next();
}

exports.handleBodyParserError = function (err, req, res, next) {
	if (err instanceof SyntaxError) res.respond(err, 400);
		else next(err);
}

exports.checkIdParameter = function(req, res, next, id) {
  if (isNaN(parseInt(id))) {
    return next({"message": "ID must be a valid integer", "code": 400});
  }
  next();
}

