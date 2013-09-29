// ----------------------------------
// Titre de l'appli
// ----------------------------------

app.title = function(newTitle)
{
    document.title = newTitle;
    $('title').text(newTitle);
};