app.views.Home = Backbone.View.extend();

// ----------------------------------
// Init and events
// ----------------------------------

app.views.Home.prototype.initialize = function(options)
{
    this.render();
};

app.views.Home.prototype.events = {
    'submit form': 'formSubmit'
};

// ----------------------------------
// Actions
// ----------------------------------

app.views.Home.prototype.render = function()
{
    this.$el.html('template_Home', {});
    
    return this;
};

app.views.Home.prototype.formSubmit = function()
{
	var that = this;
	var url = $("#url")[0].value;
	if(url.length<3)
		return false;

	var model = new app.models.Url();
	model.save(
		{
			url:url
		},{
			success: function(res){
				that.showResult();

				var result = app.BASE_URL+""+res.get("hash");
				$(".result .content").html(result);

				var winChar = url.length-result.length;
				if(winChar>=0){
					$(".comment").html("You win "+winChar+" char(s).");
				}else{
					$(".comment").html("You lose "+Math.abs(winChar)+" char(s).");
				}
				console.log(res);
			}
		});
	return false;

};

app.views.Home.prototype.showResult = function(){
	$(".result",this.$el).removeClass("hidden");
}