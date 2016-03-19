var ExampleView = function (container, model) {

	this.addActivityBtn = container.find("#addActivityBtn");
	this.cancelActivityBtn = container.find("#cancelActivityBtn");

	// VIEW 4
	this.displayView4 = function(yn) {
		if (yn) 
			$("#overlay").attr("style","visibility:visible;");
		else 
			$("#overlay").attr("style","visibility:hidden;");
	}

	// Displaying Activities
	var displayActivities = function(activityTable) {
		var tableau = "";
		activityTable.forEach(function(element, index, array) {
			tableau += "<tr width='100%'><td width='30%' class='time'>" + element.getLength() 
			+ " min</td><td width='70%' class='activity type-" + element.getTypeId() + "'>" + element.getName() + "</td></tr>";
		});
		return tableau;
	}

	// VIEW 1 (PARKED)
	var updateView1 = function(args) {
		$("#td-1").html(displayActivities(model.parkedActivities));
	}

	// VIEW 2 (DAY)
	var updateView2 = function(args) {
		// Clear the previous displays
		$("#dayContainer").html("");
		model.days.forEach(function(element,index,array) {
			// We want an alternated color scheme
			var pair = 0;
			if (index & 1) pair = 1;

			// Compute the activity table
			var table = displayActivities(element._activities);
			$("#originalColumn").attr("class","col-md-4 dayColumn pair-"+ pair);
			$("#originalColumn .titleDay").html("Day " + index);
			$("#originalColumn .time").attr("id","timepicker-" + index);
			$("#originalColumn .endTime").html(element.getEnd());
			$("#originalColumn .totalLength").html(element.getTotalLength() + " mn");
			$("#originalColumn .type-1").attr("style","height: "+ element.getLengthByType(1)/element.getTotalLength()*100 + "%;");
			$("#originalColumn .type-2").attr("style","height: "+ element.getLengthByType(2)/element.getTotalLength()*100 + "%;");
			$("#originalColumn .type-3").attr("style","height: "+ element.getLengthByType(3)/element.getTotalLength()*100 + "%;");
			$("#originalColumn .type-4").attr("style","height: "+ element.getLengthByType(4)/element.getTotalLength()*100 + "%;");
			$("#originalColumn .tableDraggable").html(table);

			var clonedDiv = $('#originalColumn').clone();
			clonedDiv.attr("id", "day-" + index);
			$("#dayContainer").append(clonedDiv);		

		});
		// Activate the timepicker
		model.days.forEach(function(element,index,array) {
			$("#timepicker-"+index).timepicker("setTime",element.getStart());
		});
	}

	model.addObserver(updateView1);
	model.addObserver(updateView2);
}