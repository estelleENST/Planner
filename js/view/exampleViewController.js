var ExampleViewController = function(view, model ) {
	
	// Controllers view 1
	view.addActivityBtn.click(function() {
		view.displayView4(true);
	})

	// Controllers view 4
	view.cancelActivityBtn.click(function() {
		view.displayView4(false);
	})
}