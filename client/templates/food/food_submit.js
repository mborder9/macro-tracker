Template.foodSubmit.events({ 
	'submit form': function(e) {
    	e.preventDefault();
		var food_data = {
			food: $(e.target).find('[name=food]').val(), 
			serving_size: $(e.target).find('[name=serving_size]').val(),
			protein: $(e.target).find('[name=protein]').val(),
			fats: $(e.target).find('[name=fats]').val(),
			carbs: $(e.target).find('[name=carbs]').val(),
			calories: $(e.target).find('[name=calories]').val(),
		};
		food_data._id = Foods.insert(food_data);
    	Session.set('addNewEntry', false);
  	}
});