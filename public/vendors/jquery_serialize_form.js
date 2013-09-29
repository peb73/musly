

// Serialise un formulaire en objet
// De ça <input name="author" value="John" /><input name="message" value="coucou" />
// Vers ça {author: 'John', message: 'coucou'}

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
