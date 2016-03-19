$(function() {

	// this is the instance of our main model
	// this is what you should use in your application
	var model = new Model();

	// //And create the needed controllers and views
	var exampleView = new ExampleView($("#exampleView"),model);
	var exampleViewController = new ExampleViewController(exampleView,model);
	
	model.addDay(9,20);
	model.addDay(8,30);
	model.addActivity(new Activity("Group work",20,1,"IVIS16"),0,0);
	model.addActivity(new Activity("Fika",120,2,"Pink Crush"),0,1);	
	model.addActivity(new Activity("Presentation",10,3,"Pink Crush"),0,2);	
	model.addActivity(new Activity("Brainstorm",20,4,"Pink Crush"),1,0);	
	model.addActivity(new Activity("Break",10,2,"Coffee"));
	model.addDay(00,00);
	model.addDay(10,03);

});