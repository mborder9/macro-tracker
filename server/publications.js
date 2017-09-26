Meteor.publish('foods', function(){
	return Foods.find();
})

Meteor.publish('user_history', function(id){
	return userHistory.find();
})