app.views.Default = Backbone.View.extend();

// ----------------------------------
// Init and events
// ----------------------------------

app.views.Default.prototype.initialize = function(options)
{
    this.render();
};

app.views.Default.prototype.events = {
    //'click #create': 'createANewFolder'
};

// ----------------------------------
// Actions
// ----------------------------------

app.views.Default.prototype.render = function()
{
    this.$el.html('template_Default', {});
    
    return this;
};