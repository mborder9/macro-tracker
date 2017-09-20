Template.foodDropdown.events({
	'change .dropdown_breakfast' (event) {
		console.log("Breakfast change EVENT!!");
		var id = event.currentTarget.id;
		var num = id.split(/_/)[0];
		console.log('Breakfast change setting breakfast_'+num+' equal to'+event.target.value);
		console.log(Foods.findOne({food:event.target.value}).protein);
		Session.set('breakfast_'+num, event.target.value);
		Session.set('breakfast_'+num+'_protein',Foods.findOne({food:event.target.value}).protein);
		Session.set('breakfast_'+num+'_carbs',Foods.findOne({food:event.target.value}).carbs);
		Session.set('breakfast_'+num+'_fats',Foods.findOne({food:event.target.value}).fats);
		Session.set('breakfast_'+num+'_calories',Foods.findOne({food:event.target.value}).calories);
	},
	'change .dropdown_snacks' (event) {
		var id = event.currentTarget.id;
		var num = id.split(/_/)[0];
		Session.set('snacks_'+num, event.target.value);
		Session.set('snacks_'+num+'_protein',Foods.findOne({food:event.target.value}).protein);
		Session.set('snacks_'+num+'_carbs',Foods.findOne({food:event.target.value}).carbs);
		Session.set('snacks_'+num+'_fats',Foods.findOne({food:event.target.value}).fats);
		Session.set('snacks_'+num+'_calories',Foods.findOne({food:event.target.value}).calories);
	},
	'change .dropdown_lunch' (event) {
		var id = event.currentTarget.id;
		var num = id.split(/_/)[0];
		Session.set('lunch_'+num, event.target.value);
		Session.set('lunch_'+num+'_protein',Foods.findOne({food:event.target.value}).protein);
		Session.set('lunch_'+num+'_carbs',Foods.findOne({food:event.target.value}).carbs);
		Session.set('lunch_'+num+'_fats',Foods.findOne({food:event.target.value}).fats);
		Session.set('lunch_'+num+'_calories',Foods.findOne({food:event.target.value}).calories);
	},
	'change .dropdown_dinner' (event) {
		var id = event.currentTarget.id;
		var num = id.split(/_/)[0];
		Session.set('dinner_'+num, event.target.value);
		Session.set('dinner_'+num+'_protein',Foods.findOne({food:event.target.value}).protein);
		Session.set('dinner_'+num+'_carbs',Foods.findOne({food:event.target.value}).carbs);
		Session.set('dinner_'+num+'_fats',Foods.findOne({food:event.target.value}).fats);
		Session.set('dinner_'+num+'_calories',Foods.findOne({food:event.target.value}).calories);
	}
});

Template.weeklyTrack.events({
	'click #breakfast-btn' (event) {
		var rows = Session.get('breakfast_NumberRows');
		console.log(rows)
		Session.set('breakfast_NumberRows', rows+1);
		var newRow = rows+1;
		Session.set('breakfast_'+newRow+'_protein',0);
		Session.set('breakfast_'+newRow+'_carbs',0);
		Session.set('breakfast_'+newRow+'_fats',0);
		Session.set('breakfast_'+newRow+'_calories',0);
	},
	'click #snacks-btn' (event) {
		var rows = Session.get('snacks_NumberRows');
		console.log(rows)
		Session.set('snacks_NumberRows', rows+1);
		var newRow = rows+1;
		Session.set('snacks_'+newRow+'_protein',0);
		Session.set('snacks_'+newRow+'_carbs',0);
		Session.set('snacks_'+newRow+'_fats',0);
		Session.set('snacks_'+newRow+'_calories',0);
	},
	'click #lunch-btn' (event) {
		var rows = Session.get('lunch_NumberRows');
		console.log(rows)
		Session.set('lunch_NumberRows', rows+1);
		var newRow = rows+1;
		Session.set('lunch_'+newRow+'_protein',0);
		Session.set('lunch_'+newRow+'_carbs',0);
		Session.set('lunch_'+newRow+'_fats',0);
		Session.set('lunch_'+newRow+'_calories',0);
	},
	'click #dinner-btn' (event) {
		var rows = Session.get('dinner_NumberRows');
		console.log(rows)
		Session.set('dinner_NumberRows', rows+1);
		var newRow = rows+1;
		Session.set('dinner_'+newRow+'_protein',0);
		Session.set('dinner_'+newRow+'_carbs',0);
		Session.set('dinner_'+newRow+'_fats',0);
		Session.set('dinner_'+newRow+'_calories',0);
	},
	'input .quantity' (event) {
		var id = event.currentTarget.id;
		var num = id.split(/_/)[0];
		var type = id.split(/_/)[2];
		console.log("Setting quantity of "+type+" row"+num+" to"+event.currentTarget.value);
    	Session.set(type+'_'+num+'_quantity', event.currentTarget.value);
  	}
});

Template.weeklyTrack.helpers({
	returnOne: function(){
		var count = Session.get('counter');
		Session.set('counter', count+1);
		return count;
	},
	getBreakfastFood: function(){
		console.log("Get breakfast Food - Row:"+this);
		
		var selection = Session.get('breakfast_'+this)
		console.log("Get current Food - Selection:"+selection);
		return Foods.findOne({food : selection});
	},
	getSnackFood: function(){
		console.log("Get snack Food - Row:"+this);
		
		var selection = Session.get('snacks_'+this)
		console.log("Get current Food - Selection:"+selection);
		return Foods.findOne({food : selection});
	},
	getLunchFood: function(){
		var selection = Session.get('lunch_'+this)
		console.log("Get current Food - Selection:"+selection);
		return Foods.findOne({food : selection});
	},
	getDinnerFood: function(){
		var selection = Session.get('dinner_'+this)
		console.log("Get current Food - Selection:"+selection);
		return Foods.findOne({food : selection});
	},
	getNumberRows: function(type){

		var numRows = Session.get(type+'_NumberRows');
		console.log("getNumberRows: Current number of rows for "+type+" = "+numRows);
		var numArr = [];
		for (var i=0; i<numRows; i++){
			numArr.push(i);
		}
		return numArr;
	},
	getSum: function(nutrient, type){
		console.log(nutrient);
		var rows = Session.get(type+'_NumberRows');
		console.log(rows);
		var sum = 0;
		var nut = 0;
		var quantity = 0;
		for(var i=0; i<rows; i++){
			console.log('row' + i + ':' + nutrient + ' - ' + Session.get(type+'_'+i+'_'+nutrient))
			nut = parseFloat(Session.get(type+'_'+i+'_'+nutrient));
			quantity = parseFloat(Session.get(type+'_'+i+'_quantity'));
			if(isNaN(quantity)){
				quantity = 0;
			}
			if(typeof Session.get(type+'_'+i+'_'+nutrient) !== 'undefined'){
				sum = sum + (quantity*nut);
			}
			
		}
		if(isNaN(sum)){
			Session.set(type+nutrient+'_sum', 0);
			return 0;
		} else {
			Session.set(type+"_"+nutrient+'_sum',sum.toFixed(2));
			return sum.toFixed(2);
		}
		
	},
	getTotalSum: function(nutrient){
		var BreakfastSum = parseFloat(Session.get("breakfast_"+nutrient+"_sum"));
		var SnacksSum = parseFloat(Session.get("snacks_"+nutrient+"_sum"));
		var LunchSum = parseFloat(Session.get("lunch_"+nutrient+"_sum"));
		var DinnerSum = parseFloat(Session.get("dinner_"+nutrient+"_sum"));

		var total = BreakfastSum + SnacksSum + LunchSum + DinnerSum;

		Session.set("total_"+nutrient, total);
		return total.toFixed(2);
	}
});

Template.weeklyTrack.onCreated(function() {
    Session.set('breakfast_NumberRows', 1);      // <---
    Session.set('snacks_NumberRows', 1); 
    Session.set('lunch_NumberRows', 1); 
    Session.set('dinner_NumberRows', 1);

    Session.set('breakfast_0_protein',0);
	Session.set('breakfast_0_carbs',0);
	Session.set('breakfast_0_fats',0);
	Session.set('breakfast_0_calories',0);
	Session.set('breakfast_0_quantity',0);

	Session.set('snacks_0_protein',0);
	Session.set('snacks_0_carbs',0);
	Session.set('snacks_0_fats',0);
	Session.set('snacks_0_calories',0);
	Session.set('snacks_0_quantity',0);

	Session.set('lunch_0_protein',0);
	Session.set('lunch_0_carbs',0);
	Session.set('lunch_0_fats',0);
	Session.set('lunch_0_calories',0);
	Session.set('lunch_0_quantity',0);

	Session.set('dinner_0_protein',0);
	Session.set('dinner_0_carbs',0);
	Session.set('dinner_0_fats',0);
	Session.set('dinner_0_calories',0);
	Session.set('dinner_0_quantity',0);
    console.log('Template.body.onCreated');  
});

Template.weeklyTrack.destroyed = function(){
  Session.set('CurrentSelection', null);
}