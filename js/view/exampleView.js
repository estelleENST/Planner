var ExampleView = function (container, model) {

//*** Variables accessed in view controller ***

	// Add activity listener
	this.addActivityBtn = container.find("#addActivityBtn");
	this.cancelActivityBtn = container.find("#cancelActivityBtn");
	this.saveActivityBtn = container.find("#saveActivityBtn");
	this.addActivityTitle = container.find("#newTitle");
	this.addActivityDuree = container.find("#newDuree");
	this.addActivityType = container.find("#newType");
	this.addActivityDescription = container.find("#newDescription");

	// Add day listener
	this.addDayBtn = container.find("#addDayBtn");
	this.deleteDayBtn = container.find("#deleteDay");

	// function to toggle display of VIEW 4 (overlay to add an activity)
	this.displayView4 = function(yn) {
		if (yn) 
			$("#overlay").attr("style","visibility:visible;");
		else 
			$("#overlay").attr("style","visibility:hidden;");
	}

	// function to get the currently displayed listeners for a day (id = "#timepicker-" or "#deleteDayBtn-")
	this.getDisplayedDaysListeners = function(id) {
		var t = [];
		model.days.forEach(function(element,index,array) {
			t.push($(id+index));
		});
		return t;
	}

// *** Observers we call for each update in the model ***

	// function to display activities
	var displayActivities = function(activityTable) {
		var tableau = "<tbody class='connectedSortable'>";
		activityTable.forEach(function(element, index, array) {
			tableau += "<tr width='100%' draggable='true'><td width='30%' class='time'>" + element.getLength() 
			+ " min</td><td width='70%' class='activity type-" + element.getTypeId() + "'>" + element.getName() + "</td></tr>";
		});
		tableau += "</tbody>";
		return tableau;
	}

	// VIEW 1 (Parked activities)
	var updateView1 = function(args) {
		$("#td-1").html(displayActivities(model.parkedActivities));

		$( ".connectedSortable" )
        .sortable()
        .disableSelection();
	}

	// VIEW 2 (One day)
	var updateView2 = function(args) {
		// Clear the previous displays
		$("#dayContainer").html("");
		model.days.forEach(function(element,index,array) {

			// Compute the activity table
			var table = displayActivities(element._activities);
			// $("#originalColumn").attr("class","col-md-4 dayColumn pair-"+ pair); Uncomment this to have an alternated color scheme
			$("#originalColumn .titleDay").html("Day " + index);
			$("#originalColumn .time").attr("id","timepicker-" + index);
			$("#originalColumn .endTime").html(element.getEnd());
			$("#originalColumn .totalLength").html(element.getTotalLength() + " mn");
			$("#originalColumn .type-1").attr("style","height: "+ element.getLengthByType(1)/element.getTotalLength()*100 + "%;");
			$("#originalColumn .type-2").attr("style","height: "+ element.getLengthByType(2)/element.getTotalLength()*100 + "%;");
			$("#originalColumn .type-3").attr("style","height: "+ element.getLengthByType(3)/element.getTotalLength()*100 + "%;");
			$("#originalColumn .type-4").attr("style","height: "+ element.getLengthByType(4)/element.getTotalLength()*100 + "%;");
			$("#originalColumn .tableDraggable").html(table);
			$("#originalColumn .deleteDay").attr("id","deleteDayBtn-"+index);
			$("#originalColumn .tableDraggable").attr("id","tableDraggable-"+index);

			var clonedDiv = $('#originalColumn').clone();
			clonedDiv.attr("id", "day-" + index);
			$("#dayContainer").append(clonedDiv);		

		});

		// Activate the timepicker and repopulate the array
		model.days.forEach(function(element,index,array) {
			$("#timepicker-"+index).timepicker("setTime",element.getStart());
		});

		$( ".connectedSortable" )
        .sortable()
        .disableSelection();

        $( "#dayContainer" )
        .sortable()
	}

	model.addObserver(updateView1);
	model.addObserver(updateView2);
}