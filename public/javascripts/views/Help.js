app.views.Help = Backbone.View.extend();

// ----------------------------------
// Init and events
// ----------------------------------

app.views.Help.prototype.initialize = function(options)
{
    this.render();
};

app.views.Help.prototype.events = {
    //'click #create': 'createANewFolder'
};

// ----------------------------------
// Actions
// ----------------------------------

app.views.Help.prototype.render = function()
{
    this.$el.html('template_Help', {});
    
    return this;
};