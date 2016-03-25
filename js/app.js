// this is the instance of our main model
// this is what you should use in your application
var model = new Model();

// //And create the needed controllers and views
var exampleView = new ExampleView($("#exampleView"),model);
var exampleViewController = new ExampleViewController(exampleView,model);

// Test values
model.addDay(9,20);
model.addActivity(new Activity("Group work",20,1,"IVIS16"),0,0);
model.addActivity(new Activity("Fika",120,2,"Pink Crush"),0,1);	
model.addActivity(new Activity("Presentation",10,3,"Pathicular"),0,2);
model.addActivity(new Activity("Meeting",45,4,"Cafeet"),0,3);	
model.addDay(8,30);
model.addActivity(new Activity("Brainstorm",20,4,"Maplog?"),1,0);	
model.addActivity(new Activity("Break",10,2,"Coffee"));
model.addDay(15,00);
model.addActivity(new Activity("DH2641 Lab Presentation",20,3,"Homelette"),2,0);
model.addActivity(new Activity("Pathicular",15,1,"Brainstorm"),2,1);	
model.addActivity(new Activity("Swedish",10,2,"Bilda"),2,2);	