app.views.REST = Backbone.View.extend();

// ----------------------------------
// Init and events
// ----------------------------------

app.views.REST.prototype.initialize = function(options)
{
    this.render();
};

app.views.REST.prototype.events = {
    //'click #create': 'createANewFolder'
};

// ----------------------------------
// Actions
// ----------------------------------

app.views.REST.prototype.render = function()
{
    this.$el.html('template_REST', {});
    
    return this;
};