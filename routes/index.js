/*
 * GET home page.
 */

var CONFIG = require('config').TinyURL;

exports.index = function(req, res){
  res.render('index', { title: CONFIG.title });
};