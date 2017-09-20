Template.foodList.helpers({
	foods: function() {
		return Foods.find();
	}
});