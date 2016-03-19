var ExampleViewController = function(view, model) {
	
	// Controllers view 1
	view.addActivityBtn.click(function() {
		view.displayView4(true);
	})

	// Controllers view 4
	view.cancelActivityBtn.click(function() {
		view.displayView4(false);
	})
	view.saveActivityBtn.click(function() {
		model.addActivity(new Activity(view.addActivityTitle.val(),view.addActivityDuree.val(),model.convertType(view.addActivityType.val()),view.addActivityDescription.val()));
		view.displayView4(false);
	})
}