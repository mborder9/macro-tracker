Foods =  new Mongo.Collection('foods');

var Schemas = {};

Schemas.Foods = new SimpleSchema({
	food: {
		type: String,
		label: "Food",
		max: 100
	},
	serving_size: {
		type: String,
		label: "Serving Size"
	},
	protein: {
		type: Number,
		label: "Protein",
		decimal: true,
		min: 0
	},
	carbs: {
		type: Number,
		label: "Carbs",
		decimal: true,
		min: 0
	},
	fats: {
		type: Number,
		label: "Fats",
		decimal: true,
		min: 0
	},
	calories: {
		type: Number,
		label: "Calories",
		decimal: true,
		min: 0
	},
});

Foods.attachSchema(Schemas.Foods);