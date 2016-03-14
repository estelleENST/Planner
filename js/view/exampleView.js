
var ExampleView = function (container, model) {
	this.activities = container.find("#table-draggable1");

	// Displaying

	// VIEW 1
	this.updateView1 = function(args) {
		var tableau = "";
		model.getParkedActivities().forEach(function(element, index, array) {
			tableau += "<tr><th>" + element.getLength() + " min</th><th class=\"activity\">" + element.getName() + "</th><td>";
		});

		$(activities).html(tableau);
	}

	model.addObserver(this.updateView1);

	this.updateView1();
}