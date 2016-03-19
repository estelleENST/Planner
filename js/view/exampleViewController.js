var ExampleViewController = function(view, model) {

//*** VIEW 0 (NAV) ***
	// Button to add a day
	view.addDayBtn.click(function() {
		model.addDay();
	})

//*** VIEW 1 ***
	// Button to add an activity
	view.addActivityBtn.click(function() {
		view.displayView4(true);
	})


//*** VIEW 2 ***
	// Observer that updates the controllers for each day when days in the model change
	updateTimePickersControllers = function() {
		var t = view.getTimePickers(); // Getting currently displayed timepickers in the view
		model.days.forEach(function(element,index,array) {
			t[index].on("changeTime.timepicker",function(e) { // See bootstrap's timepicker documentation
			model.days[index].setStart(e.time.hours, e.time.minutes); //*** TODO - Need to make it work with the AM / PM too
			});
		});
	}
	model.addObserver(updateTimePickersControllers);

//*** VIEW 4 ***
	// Button to cancel the addition (closes the panel)
	view.cancelActivityBtn.click(function() {
		view.displayView4(false);
	})
	// Button to save an activity
	view.saveActivityBtn.click(function() {
		if(view.addActivityTitle.val() == 0 || view.addActivityDuree.val() == 0) { // Testing if we have all needed values (no test on activity type bc it is "work" by default)
			alert("You must choose a title and a duration for your activity! ");
		} else {
			model.addActivity(new Activity(view.addActivityTitle.val(),
				view.addActivityDuree.val(),
				ActivityType.indexOf(view.addActivityType.val())+1, // +1 because the types go form 1 to 4 while index goes from 0 to 3 
				view.addActivityDescription.val()));
			view.displayView4(false);	
		}
	})
}