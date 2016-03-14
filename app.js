$(function() {
	// this is the instance of our main model
	// this is what you should use in your application
	var model = new Model();

	// //And create the needed controllers and views
	 var exampleView = new ExampleView($("#exampleView"),model);
	// var exampleViewController = new ExampleViewController(exampleView,model);
	
	// you can use this method to create some test data and test your implementation
	//function createTestData(){
		model.addDay();
		model.addActivity(new Activity("Introduction",10,0,""),0);
		model.addActivity(new Activity("Idea 1",30,0,""),0);
		model.addActivity(new Activity("Working in groups",35,1,""),0);
		model.addActivity(new Activity("Idea 1 discussion",15,2,""),0);
		model.addActivity(new Activity("Coffee break",20,3,""),0);
		
		console.log("Day Start: " + model.days[0].getStart());
		console.log("Day End: " + model.days[0].getEnd());
		console.log("Day Length: " + model.days[0].getTotalLength() + " min");
		$.each(ActivityType,function(index,type){
			console.log("Day '" + ActivityType[index] + "' Length: " +  model.days[0].getLengthByType(index) + " min");
		});
	//}

});