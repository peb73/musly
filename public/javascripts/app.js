// ----------------------------------
// Namespace pour structurer l'application
// ----------------------------------

var app = {
    collections: {},
    models: {},
    helpers: {},
    views: {}
};

// ----------------------------------
// Constantes de l'application
// ----------------------------------

// titre de l'application pour la balise <title>
app.APP_NAME = 'MUs';

// url du contenu statique, racine de la page html
app.BASE_URL = 'http://localhost:3000/';

// url du service rest
app.REST_BASE_URL = 'http://localhost:3000/';


// ----------------------------------
// Lancement (main)
// ----------------------------------

$(function()
{
    console.log(":: Starting '" + app.APP_NAME + "'");
    app.title(app.APP_NAME);

    // Prise en compte des routes
    app.Route = new app.Router();

    // Gestion de l'historique
    Backbone.history.start({root: app.BASE_URL});
});
