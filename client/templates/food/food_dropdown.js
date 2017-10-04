Template.foodDropdown.helpers({
	foods: function() {
		return Foods.find();
	},
	getCurrentValue: function(row, type) {
		console.log(Session.get(type+"_"+row));
		return Session.get(type+"_"+row);
	}
});