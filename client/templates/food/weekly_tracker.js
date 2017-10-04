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

function getData(meal, data){
    for(var i = 0; i<data.length; i++){
    	console.log("Setting "+meal+"_"+i+" equal to: "+data[i].food);
		Session.set(meal+'_'+i, data[i].food);
		console.log("Setting "+meal+"_"+i+"_quantity equal to: "+data[i].quantity);
		Session.set(meal+'_'+i+'_quantity', data[i].quantity);
		setNutrition(meal,i,data[i].food);
	}
    
	
}

function eraseData(meal){
	var rows = Session.get(meal+"_NumberRows");
	for (var i = 0; i < rows; i ++){
		Session.set(meal+'_'+i, '');
		Session.set(meal+'_'+i+'_protein', 0);
		Session.set(meal+'_'+i+'_carbs', 0);
		Session.set(meal+'_'+i+'_fats', 0);
		Session.set(meal+'_'+i+'_calories', 0);
	}
	Session.set(meal+"_NumberRows",0);
}
function loadData(){
	var data = userHistory.findOne({user: Meteor.user()._id, date: Session.get('currentDate')});
	console.log(data);
	if(data){
		var breakfast = data.breakfast;
		if(breakfast){
			Session.set('breakfast_NumberRows', breakfast.length);
			getData("breakfast", breakfast);
			updateSum("breakfast");
		}else {
			eraseData("breakfast");
			updateSum("breakfast");
		}

		var snacks = data.snacks;
		if(snacks){
			Session.set('snacks_NumberRows', snacks.length);
			getData("snacks", snacks);
			updateSum("snacks");
		}else {
			eraseData("snacks");
			updateSum("snacks");
		}

		var lunch = data.lunch;
		if(lunch){
			Session.set('lunch_NumberRows', lunch.length);
			getData("lunch", lunch);
			updateSum("lunch");
		}else {
			eraseData("lunch");
			updateSum("lunch");
		}

		var dinner = data.dinner;
		if(dinner){
			Session.set('dinner_NumberRows', dinner.length);
			getData("dinner", dinner);
			updateSum("dinner");
		}else {
			eraseData("dinner");
			updateSum("dinner");
		}
	}else {
			console.log("ERASE DATA");
			eraseData("breakfast");
			eraseData("snacks");
			eraseData("lunch");
			eraseData("dinner");

			updateSum("breakfast");
			updateSum("snacks");
			updateSum("lunch");
			updateSum("dinner");
	}
	
}

function saveData(){
	var data = userHistory.findOne({user: Meteor.user()._id, date: Session.get('currentDate')});
	userHistory.remove({_id: data._id});

	var breakfast = Session.get('breakfast_NumberRows');
	var breakfast_arr = [];
	for (var i=0; i < breakfast; i++){
		breakfast_arr.push({
			food: Session.get('breakfast_'+i),
			quantity: Session.get('breakfast_'+i+'_quantity'),
		})
	}

	var snacks = Session.get('snacks_NumberRows');
	var snacks_arr = [];
	for (var i=0; i < snacks; i++){
		snacks_arr.push({
			food: Session.get('snacks_'+i),
			quantity: Session.get('snacks_'+i+'_quantity'),
		})
	}

	var lunch = Session.get('lunch_NumberRows');
	var lunch_arr = [];
	for (var i=0; i < lunch; i++){
		lunch_arr.push({
			food: Session.get('lunch_'+i),
			quantity: Session.get('lunch_'+i+'_quantity'),
		})
	}

	var dinner = Session.get('dinner_NumberRows');
	var dinner_arr = [];
	for (var i=0; i < dinner; i++){
		dinner_arr.push({
			food: Session.get('dinner_'+i),
			quantity: Session.get('dinner_'+i+'_quantity'),
		})
	}

	userHistory.insert({
		date: Session.get('currentDate'),
		user: Meteor.user()._id,
		breakfast: breakfast_arr,
		snacks: snacks_arr,
		lunch: lunch_arr,
		dinner: dinner_arr
	});
}

function getCurrentDate(){
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

function incrementDate(){
	var currentDate = Session.get('currentDate');
	var nextDate = new Date(currentDate);
	nextDate.setDate(nextDate.getDate() + 1);
	console.log("DAte: "+nextDate);
	var dd = nextDate.getDate();
	var mm = nextDate.getMonth()+1; //January is 0!

	var yyyy = nextDate.getFullYear();
	if(dd<10){
		dd='0'+dd;
	} 
	if(mm<10){
			mm='0'+mm;
	} 
	var nextDate = mm+'/'+dd+'/'+yyyy;
	Session.set('currentDate', nextDate);
}

function decrementDate(){
	var currentDate = Session.get('currentDate');
	var nextDate = new Date(currentDate);
	nextDate.setDate(nextDate.getDate() - 1);
	console.log("DAte: "+nextDate);
	var dd = nextDate.getDate();
	var mm = nextDate.getMonth()+1; //January is 0!

	var yyyy = nextDate.getFullYear();
	if(dd<10){
		dd='0'+dd;
	} 
	if(mm<10){
			mm='0'+mm;
	} 
	var nextDate = mm+'/'+dd+'/'+yyyy;
	Session.set('currentDate', nextDate);
}

function updateSum(meal){
	console.log("Update sum");
	var nutrients = ["protein", "carbs", "fats", "calories"];
	nutrients.forEach(function(nutrient) {
        console.log(nutrient);
		var rows = Session.get(meal+'_NumberRows');
		console.log(rows);
		var sum = 0;
		var nut = 0;
		var quantity = 0;
		for(var i=0; i<rows; i++){
			console.log('row' + i + ':' + nutrient + ' - ' + Session.get(meal+'_'+i+'_'+nutrient))
			nut = parseFloat(Session.get(meal+'_'+i+'_'+nutrient));
			quantity = parseFloat(Session.get(meal+'_'+i+'_quantity'));
			if(isNaN(quantity)){
				quantity = 0;
			}
			if(typeof Session.get(meal+'_'+i+'_'+nutrient) !== 'undefined'){
				sum = sum + (quantity*nut);
			}
			
		}
		if(isNaN(sum)){
			Session.set(meal+"_"+nutrient+'_sum', 0);
		} else {
			Session.set(meal+"_"+nutrient+'_sum',sum.toFixed(2));
		}   
    });	
    updateTotalSum();
}

function updateTotalSum(){
	var nutrients = ["protein", "carbs", "fats", "calories"];
	nutrients.forEach(function(nutrient) {

		var BreakfastSum = parseFloat(Session.get("breakfast_"+nutrient+"_sum"));
		console.log("Breakfast sum = "+BreakfastSum);
		var SnacksSum = parseFloat(Session.get("snacks_"+nutrient+"_sum"));
		console.log("Snack sum = "+SnacksSum);
		var LunchSum = parseFloat(Session.get("lunch_"+nutrient+"_sum"));
		var DinnerSum = parseFloat(Session.get("dinner_"+nutrient+"_sum"));

		var total = BreakfastSum + SnacksSum + LunchSum + DinnerSum;

		Session.set("total_"+nutrient, total);
		console.log("Total for "+nutrient+" = "+total);
	});
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
    	updateSum(type);
  	},
  	'click #breakfast-delete' (event){
  		var rows = Session.get('breakfast_NumberRows');
		deleteRow("breakfast",this, rows);
		updateSum("breakfast");
  	},
  	'click #snacks-delete' (event){
  		var rows = Session.get('snacks_NumberRows');
		deleteRow("snacks",this, rows);
		updateSum("snacks");
  	},
  	'click #lunch-delete' (event){
  		var rows = Session.get('lunch_NumberRows');
		deleteRow("lunch",this, rows);
		updateSum("lunch");
  	},
  	'click #dinner-delete' (event){
  		var rows = Session.get('dinner_NumberRows');
		deleteRow("dinner",this, rows);
		updateSum("dinner");
  	},
  	'click #save-btn' (event){
  		saveData();
  	},
  	'click #right-btn': function(event, t){
  		t.reload.set(true);
  		incrementDate();
  		loadData();
  	},
  	'click #left-btn': function(event, t){
  		t.reload.set(true);
  		decrementDate();
  		loadData();
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
		return Session.get(type+"_"+nutrient+'_sum');
		
	},
	getTotalSum: function(nutrient){
		return Session.get("total_"+nutrient);
	},
	getCurrentDate: function(){
		return Session.get("currentDate");
	},
	getCurrentQuantity: function(row, meal){
		console.log(Session.get(meal+"_"+row+"_quantity"));
		return Session.get(meal+"_"+row+"_quantity");
	}
});

Template.weeklyTrack.onCreated(function() {
    Session.set('breakfast_NumberRows', 0);      // <---
    Session.set('snacks_NumberRows', 0); 
    Session.set('lunch_NumberRows', 0); 
    Session.set('dinner_NumberRows', 0);

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

	Session.set('currentDate', getCurrentDate());
	updateSum("breakfast");
	updateSum("snacks");
	updateSum("lunch");
	updateSum("dinner");
    console.log('Template.body.onCreated');  
});

Template.weeklyTrack.created = function() {
  this.reload = new ReactiveVar();
};

Template.weeklyTrack.destroyed = function(){
  Session.set('CurrentSelection', null);
}