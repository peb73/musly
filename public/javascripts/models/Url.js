app.models.Url = Backbone.Model.extend({
	urlRoot: app.REST_BASE_URL + '',
});

// ----------------------------------
// Init and defaults
// ----------------------------------

app.models.Url.prototype.initialize = function(attributes, options)
{

};

// ----------------------------------
// Override
// ----------------------------------

/*app.models.Folder.prototype.validate = function(attributes)
{
	var error = this.validateAttribute(attributes);
	if (error) return error;

	if (attributes.attribute_beta < 5)
		return new Error('Too low');

	if (attributes.attribute_beta > 10)
		return new Error('Too high');
};*/

/*app.models.Folder.prototype.url = function()
{
	return app.REST_BASE_URL + '/abc/123/' + this.id;
};*/
