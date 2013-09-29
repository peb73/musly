// ----------------------
// Helper pour les templates
// Usage: 	var tweet_html = $.render('template_tweet_detail', {...});
// ou: 		var tweet_html = app.helpers.render('template_tweet_detail', {...});
// ou: 		$('#content').html('template_tweet_detail', {...});
// ou: 		$('#content').prepend('template_tweet_detail', {...});
// ou: 		$('#content').append('template_tweet_detail', {...});
// ou: 		$('#content').after('template_tweet_detail', {...});
// ou:  	etc.
// via l'extension jQuery
// ----------------------

$.render = function(template_name, data_json){
    return ich[template_name](data_json);
};

// ----------------------
// Extension de jQuery
// ----------------------
(function(){
	var convert, isTemplate, isHTML, isDOM, getCallback, hookupView, funcs,
		// text and val cannot produce an element, so don't run hookups on them
		noHookup = {'val':true,'text':true};

	convert = function( func_name ) {
		// save the old jQuery helper
		var old = $.fn[func_name];

		// replace it wiht our new helper
		$.fn[func_name] = function() {
			
			var args = $.makeArray(arguments),
				result;

			//check if a template
			if ( isTemplate(args) ) {
				// call view with args (there might be deferreds)
				result = $.render.apply(app.helpers.render, args);
				args = [result];
			}
			return old.apply(this, args);
		};
	};

	// returns true or false if the args indicate a template is being used
	// in general, we want to make sure the first arg is a string
	// and the second arg is data
	isTemplate = function( args ) {
		// save the second arg type
		var secArgType = typeof args[1];
		
		// the first arg is a string
		return (typeof args[0] == "string" && args[0].indexOf('template_') == 0) && 
				// the second arg is an object or function
		       (secArgType == 'object');
	};
	/**
	 *  @add jQuery.fn
	 */
	$.each([
	"prepend",

	"append",

	"after",

	"before",

	"text",

	"html"] ,function(i, func){
		convert(func);
	});
})();