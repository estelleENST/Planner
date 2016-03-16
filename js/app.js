$(function() {

	$('#timepicker1').timepicker();
	// this is the instance of our main model
	// this is what you should use in your application
	var model = new Model();

	// //And create the needed controllers and views
	var exampleView = new ExampleView($("#exampleView"),model);
	//var exampleViewController = new ExampleViewController(exampleView,model);
	
	model.addDay();
	model.addActivity(new Activity("Group work",20,1,"IVIS16"));
	model.addActivity(new Activity("Fika",120,2,"Pink Crush"));	
	model.addActivity(new Activity("Presentation",10,3,"Pink Crush"));	
	model.addActivity(new Activity("Brainstorm",20,4,"Pink Crush"));	

});