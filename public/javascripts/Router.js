app.Router = Backbone.Router.extend();

// ----------------------------------
// Init and config
// ----------------------------------

app.Router.prototype.initialize = function()
{
    console.log(":: init app.Router");
    
    new app.views.Default({
        el: $('body')
    });
};

app.Router.prototype.routes = {
    ''                                : 'defaultPage',
    'REST'                            : 'REST',
    'help'                            : 'help'
};

// ----------------------------------
// Routes
// ----------------------------------

app.Router.prototype.defaultPage = function()
{
    $(".topToolbar a").removeClass("focus");
    $(".topToolbar .home").addClass("focus");
    new app.views.Home({el:$(".container-narrow",this.$el)});
}

app.Router.prototype.REST = function()
{
    $(".topToolbar a").removeClass("focus");
    $(".topToolbar .rest").addClass("focus");
    new app.views.REST({el:$(".container-narrow",this.$el)});
}

app.Router.prototype.help = function()
{
    $(".topToolbar a").removeClass("focus");
    $(".topToolbar .help").addClass("focus");
    new app.views.Help({el:$(".container-narrow",this.$el)});
}