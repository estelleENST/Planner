
var ExampleView = function (container, model) {

	// Displaying

	// VIEW 1
	this.updateView1 = function(args) {
		var tableau = "";
		model.parkedActivities.forEach(function(element, index, array) {
			tableau += "<tr width='100%'><td width='30%' class=\"time\">" + element.getLength() 
			+ " min</td><td width='70%' class=\"activity type-" + element.getTypeId() + " \">" + element.getName() + "</td></tr>";
		});
		$("#parkedDraggable").html(tableau);
	}

	model.addObserver(this.updateView1);
}