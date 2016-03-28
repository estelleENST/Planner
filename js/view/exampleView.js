var ExampleView = function (container, model) {
	var indexDay;
	var indexActivity;

//*** Variables accessed in view controller ***

	// Add activity listener
	this.addActivityBtn = container.find("#addActivityBtn");
	this.cancelActivityBtn = container.find("#cancelActivityBtn");
	this.saveActivityBtn = container.find("#saveActivityBtn");
	this.addActivityTitle = container.find("#newTitle");
	this.addActivityDuree = container.find("#newDuree");
	this.addActivityType = container.find("#newType");
	this.addActivityDescription = container.find("#newDescription");

	// Add a day or remove a day buttons listener
	this.addDayBtn = container.find("#addDayBtn");
	this.deleteDayBtn = container.find("#deleteDay");
	this.editDayBtn = container.find("#editDay");

	// view 2: 
	this.dayContainer = container.find("#dayContainer");

	// view 5 : add a day overlay listeners (title + label + start Time)
	this.cancelcreateDayBtn = container.find("#cancelcreateDayBtn");
	this.savecreateDayBtn = container.find("#savecreateDayBtn");
	this.newTitleDay = container.find("#newTitleDay");
	this.newLabelDay = container.find("#newLabelDay");
	this.setStartTimePicker = container.find("#setStartTimePicker");
	this.setStartTimePicker.timepicker("setTime","08:00 AM");

	// view 6 : edit a day overlay listeners (title + label + start Time)
	this.canceleditDayBtn = container.find("#cancelEditDayBtn");
	this.saveEditDayBtn = container.find("#saveEditDayBtn");
	this.editTitleDay = container.find("#editTitleDay");
	this.editLabelDay = container.find("#editLabelDay");

	// view 7 : edit an activity overlay listeners (title + duration + type + description)
	this.cancelEditActivityBtn = container.find("#cancelEditActivityBtn");
	this.saveEditActivityBtn = container.find("#saveEditActivityBtn");
	this.removeEditActivityBtn = container.find("#removeEditActivityBtn");
	this.editTitleActivity = container.find("#editTitleActivity");
	this.editDureeActivity = container.find("#editDureeActivity");
	this.editTypeActivity = container.find("#editTypeActivity");
	this.editDescriptionActivity = container.find("#editDescriptionActivity");

	// function to toggle display of VIEW 4 (overlay to add an activity)
	this.displayView4 = function(yn) {
		if (yn) 
			$("#overlay").attr("style","visibility:visible;");
		else 
			$("#overlay").attr("style","visibility:hidden;");
	}

	// function to toggle display of VIEW 5 (overlay to add an activity)
	this.displayView5 = function(yn) {
		if (yn) 
			$("#overlayDay").attr("style","visibility:visible;");
		else 
			$("#overlayDay").attr("style","visibility:hidden;");
	}

	// function to toggle display of VIEW 6 (overlay to add an activity)
	this.displayView6 = function(yn) {
		if (yn) 
			$("#overlayEditDay").attr("style","visibility:visible;");
		else 
			$("#overlayEditDay").attr("style","visibility:hidden;");
	}

	// function to toggle display of VIEW 7 (overlay to edit an activity)
	this.displayView7 = function(yn) {
		if (yn) 
			$("#overlayEditActivity").attr("style","visibility:visible;");
		else 
			$("#overlayEditActivity").attr("style","visibility:hidden;");
	}

	// function to get the currently displayed listeners for a day (id = "#timepicker-" or "#deleteDayBtn-")
	this.getDisplayedDaysListeners = function(id) {
		var t = [];
		model.days.forEach(function(element,index,array) {
			t.push($(id+index));
		});
		return t;
	}

	// function to get the currently displayed listeners for the parked column (delete an activity button)
	this.getDisplayedActivitiesListeners = function(id) {
		var t = [];
		model.parkedActivities.forEach(function(element,index,array) {
			t.push($(id+index));
		});
		return t;
	}

	// function to get the currently displayed listeners for the activity column (edit an activity button)
	this.getDisplayedActivityListeners = function(id) {
		var t = [];
		model.days.forEach(function(element,index,array) {
			var t2 = [];
			element._activities.forEach(function(element1, index1, array1){
				t2.push($(id+index+index1));
			})
			t.push(t2);
		});
		return t;
	}

	// function to set the index (global variable) of the day we currently want to edit
	this.setIndexDay = function(id){
		indexDay = id;
	}

	// function to get the index of the day we want to edit
	this.getIndexDay = function(){
		return indexDay;
	}

	// function to set the index (global variable) of the activity we currently want to edit
	this.setIndexActivity = function(id){
		indexActivity = id;
	}

	// function to get the index of the activity we want to edit
	this.getIndexActivity = function(){
		return indexActivity;
	}

// *** Observers we call for each update in the model ***

	// function to display activities
	var displayActivities = function(activityTable) {
		var tableau = "<tbody class='connectedSortable' id='parkedTable'>";
		activityTable.forEach(function(element, index, array) {
			tableau += "<tr width='100%' draggable='true' data-container='body' data-toggle='tooltip' data-placement='bottom' title='" 
			+ element.getDescription() + "' data-id='" + index + "'><td width='30%' class='time'>" + element.getLength() 
			+ " min</td><td width='60%' class='activity type-" + element.getTypeId() + "'>" + element.getName() 
			+ "</td><td width='10%' class='activity type-" + element.getTypeId() 
			+ "'><span id='deleteActivity-" + index + "' class='glyphicon glyphicon-remove deleteActivity'></span></td></tr>";
		});
		tableau += "</tbody>";
		tooltipFunction();
		return tableau;
	}

	// function to display activities per day
	var displayActivitiesDay = function(activityTable,day) {
		var tableau = "<tbody class='connectedSortable' id='" + model.days.indexOf(day) + "'>";
		var time = day.getStartTime();
		var count = 0;
		activityTable.forEach(function(element, index, array) {
			var timeHM;
			// Showing 10:00 instead of 10:0
			if (time % 60 <10){
				timeHM = Math.floor(time/60) + ":0" + time%60;
			} else {
				timeHM = Math.floor(time/60) + ":" + time%60;
			}
			tableau += "<tr width='100%' draggable='true' data-container='body' data-toggle='tooltip' data-placement='bottom' title='" 
			+ element.getDescription() + "' data-id='" + index + "'><td width='30%' class='time'>" + timeHM  + "<p class='duration'>" + " (" + element.getLength() + " min)" 
			+ "</p></td><td width='60%' class='activity type-" + element.getTypeId() + "'>" + element.getName() 
			+ "</td><td width='10%' class='activity type-" + element.getTypeId() 
			+ "'><span id='editActivity-" + model.days.indexOf(day)+ index + "' class='glyphicon glyphicon-pencil editActivity'></span></td></tr>";
			time += element.getLength();
			count ++;
		});
		tableau += "</tbody>";
		tooltipFunction();
		return tableau;
	}

	var tooltipFunction = function(){
		$(document).ready(function(){
		    $('[data-toggle="tooltip"]').tooltip();   
		});
	}

	// VIEW 1 (Parked activities)
	var updateView1 = function(args) {
		$("#td-1").html(displayActivities(model.parkedActivities));
	}

	// VIEW 2 (One day)
	var updateView2 = function(args) {
		// Clear the previous displays
		$("#dayContainer").html("");
		model.days.forEach(function(element,index,array) {
			$("#originalColumn .titleDay").html(element._title);
			$("#originalColumn .labelDay").html(element._label);
			$("#originalColumn .titleDay").attr("id","newTitleDay-"+index);
			$("#originalColumn .labelDay").attr("id","newLabelDay-"+index);	
			$("#originalColumn .time").attr("id","timepicker-" + index);
			$("#originalColumn .endTime").html(element.getEnd());
			$("#originalColumn .totalLength").html(element.getTotalLength() + " mn");
			$("#originalColumn .type-1").attr("style","height: "+ element.getLengthByType(1)/element.getTotalLength()*100 + "%;");
			$("#originalColumn .type-2").attr("style","height: "+ element.getLengthByType(2)/element.getTotalLength()*100 + "%;");
			$("#originalColumn .type-3").attr("style","height: "+ element.getLengthByType(3)/element.getTotalLength()*100 + "%;");
			$("#originalColumn .type-4").attr("style","height: "+ element.getLengthByType(4)/element.getTotalLength()*100 + "%;");
			$("#originalColumn #addClass").attr("class","row translucentContainer");
			$("#originalColumn .tableDraggable").html(displayActivitiesDay(element._activities, element));
			$("#originalColumn .deleteDay").attr("id","deleteDayBtn-"+index);
			$("#originalColumn .editDay").attr("id","editDayBtn-"+index);
			$("#originalColumn .tableDraggable").attr("id","tableDraggable-"+index);

			var clonedDiv = $('#originalColumn').clone();
			clonedDiv.attr("id", "day-" + index);
			$("#dayContainer").append(clonedDiv);
			// We remove the class "translucentContainer" that enables drag & drop from the original column
			$("#originalColumn #addClass").attr("class","row");
			$("#originalColumn .removeEditActivityBtn").attr("class","row");
		});

		// Activate the timepicker and repopulate the array
		model.days.forEach(function(element,index,array) {
			$("#timepicker-"+index).timepicker("setTime",element.getStart());
		});
		tooltipFunction();
	}

	model.addObserver(updateView1);
	model.addObserver(updateView2);

}