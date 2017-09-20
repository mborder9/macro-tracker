if (Foods.find().count() === 0){
	Foods.insert({
		food: 'Egg',
		serving_size: '1 large Egg',
		protein: '6.34',
		carbs: '1.86',
		fats: '6.95',
		calories: '93'
	});
	Foods.insert({
		food: 'Ham',
		serving_size: '1 slice',
		protein: '4.36',
		carbs: '0.79',
		fats: '0.93',
		calories: '30'
	});
	Foods.insert({
		food: 'Cheese',
		serving_size: '3cm cube',
		protein: '12.24',
		carbs: '0.34',
		fats: '15.14',
		calories: '187'
	});
}