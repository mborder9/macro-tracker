function setNutrition(meal, row, value){
	
	if(value !== 0){
		Session.set(meal+'_'+row, value);
		Session.set(meal+'_'+row+'_protein', Foods.findOne({food:value}).protein);
		Session.set(meal+'_'+row+'_carbs', Foods.findOne({food:value}).carbs);
		Session.set(meal+'_'+row+'_fats', Foods.findOne({food:value}).fats);
		Session.set(meal+'_'+row+'_calories', Foods.findOne({food:value}).calories);
	}else{
		Session.set(meal+'_'+row, '');
		Session.set(meal+'_'+row+'_protein', 0);
		Session.set(meal+'_'+row+'_carbs', 0);
		Session.set(meal+'_'+row+'_fats', 0);
		Session.set(meal+'_'+row+'_calories', 0);
	}
		
}

function deleteRow(meal, row, numRows){
	var element = "";
	for (var i = row; i < numRows; i++ ) {
		 var nxt = i+1;
		 Session.set(meal+'_'+i, Session.get(meal+'_'+nxt));
         Session.set(meal+'_'+i+'_protein', Session.get(meal+'_'+nxt+'_protein'));
         Session.set(meal+'_'+i+'_carbs', Session.get(meal+'_'+nxt+'_carbs'));
         Session.set(meal+'_'+i+'_fats', Session.get(meal+'_'+nxt+'_fats'));
         Session.set(meal+'_'+i+'_calories', Session.get(meal+'_'+nxt+'_calories'));
         Session.set(meal+'_'+i+'_quantity', Session.get(meal+'_'+nxt+'_quantity'));
         element = document.getElementById(i+'_select');
    	 element.value = Session.get(meal+'_'+nxt);
    	 element = document.getElementById(i+'_quantity_'+meal);
    	 element.value = Session.get(meal+'_'+nxt+'_quantity');
	}
    Session.set(meal+'_NumberRows', numRows-1);
    
}

Template.foodDropdown.events({
	'change .dropdown_breakfast' (event) {
		console.log("Changing dropdown_breakfast");
		var id = event.currentTarget.id;
		var row = id.split(/_/)[0];
		var meal = "breakfast";
		var value = event.target.value;
		setNutrition(meal,row,value);
	},
	'change .dropdown_snacks' (event) {
		var id = event.currentTarget.id;
		var row = id.split(/_/)[0];
		var meal = "snacks";
		var value = event.target.value;
		setNutrition(meal,row,value);
	},
	'change .dropdown_lunch' (event) {
		var id = event.currentTarget.id;
		var row = id.split(/_/)[0];
		var meal = "lunch";
		var value = event.target.value;
		setNutrition(meal,row,value);
	},
	'change .dropdown_dinner' (event) {
		var id = event.currentTarget.id;
		var row = id.split(/_/)[0];
		var meal = "dinner";
		var value = event.target.value;
		setNutrition(meal,row,value);
	}
});

Template.weeklyTrack.events({
	'click #breakfast-btn' (event) {
		var rows = Session.get('breakfast_NumberRows');
		Session.set('breakfast_NumberRows', rows+1);
		var newRow = rows+1;
		var meal = "breakfast";
		setNutrition(meal,newRow,0);
		console.log("reading new row value - row"+newRow+" "+Session.get('breakfast_'+newRow));
	},
	'click #snacks-btn' (event) {
		var rows = Session.get('snacks_NumberRows');
		console.log(rows)
		Session.set('snacks_NumberRows', rows+1);
		var newRow = rows+1;
		var meal = "snacks";
		setNutrition(meal,newRow,0);
	},
	'click #lunch-btn' (event) {
		var rows = Session.get('lunch_NumberRows');
		console.log(rows)
		Session.set('lunch_NumberRows', rows+1);
		var newRow = rows+1;
		var meal = "lunch";
		setNutrition(meal,newRow,0);
	},
	'click #dinner-btn' (event) {
		var rows = Session.get('dinner_NumberRows');
		console.log(rows)
		Session.set('dinner_NumberRows', rows+1);
		var newRow = rows+1;
		var meal = "dinner";
		setNutrition(meal,newRow,0);
	},
	'input .quantity' (event) {
		var id = event.currentTarget.id;
		var num = id.split(/_/)[0];
		var type = id.split(/_/)[2];
		console.log("Setting quantity of "+type+" row"+num+" to"+event.currentTarget.value);
    	Session.set(type+'_'+num+'_quantity', event.currentTarget.value);
  	},
  	'click #breakfast-delete' (event){
  		var rows = Session.get('breakfast_NumberRows');
		deleteRow("breakfast",this, rows);
  	},
  	'click #snacks-delete' (event){
  		var rows = Session.get('snacks_NumberRows');
		deleteRow("snacks",this, rows);
  	},
  	'click #lunch-delete' (event){
  		var rows = Session.get('lunch_NumberRows');
		deleteRow("lunch",this, rows);
  	},
  	'click #dinner-delete' (event){
  		var rows = Session.get('dinner_NumberRows');
		deleteRow("dinner",this, rows);
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
	},
	getCurrentDate: function(){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!

		var yyyy = today.getFullYear();
		if(dd<10){
    		dd='0'+dd;
		} 
		if(mm<10){
   			mm='0'+mm;
		} 
		var today = mm+'/'+dd+'/'+yyyy;
		return today;
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