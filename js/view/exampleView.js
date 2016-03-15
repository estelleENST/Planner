
var ExampleView = function (container, model) {

	// Displaying

	// VIEW 1
	this.updateView1 = function(args) {
		var tableau = "";
		model.parkedActivities.forEach(function(element, index, array) {
			tableau += "<tr><th>" + element.getLength() + " min</th><th class=\"activity\">" + element.getName() + "</th><td>";
		});

		$("#table-draggable1").html(tableau);
	}

	model.addObserver(this.updateView1);
}