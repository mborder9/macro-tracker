Meteor.publish('foods', function(){
	return Foods.find();
})