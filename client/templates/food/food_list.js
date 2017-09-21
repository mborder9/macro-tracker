Template.foodList.helpers({
	foods: function() {
		return Foods.find();
	},
	addNewEntry: function(){
		return Session.get('addNewEntry');
	}
});

Template.foodList.events({
	'click #add-btn' (event) {
		Session.set('addNewEntry', true);
	}
});

Template.weeklyTrack.onCreated(function() {
	Session.set('addNewEntry', false);
});