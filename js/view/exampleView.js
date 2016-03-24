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

	// Add a day or remove a day buttons listener
	this.addDayBtn = container.find("#addDayBtn");
	this.deleteDayBtn = container.find("#deleteDay");

	// view 2: 
	this.dayContainer = container.find("#dayContainer");

	// view 5 : add a day overlay listeners (title + label + start Time)
	this.cancelcreateDayBtn = container.find("#cancelcreateDayBtn");
	this.savecreateDayBtn = container.find("#savecreateDayBtn");
	this.newTitleDay = container.find("#newTitleDay");
	this.newLabelDay = container.find("#newLabelDay");
	this.setStartTimePicker = container.find("#setStartTimePicker");
	this.setStartTimePicker.timepicker("setTime","08:00 AM");

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
			tableau += "<tr width='100%' draggable='true' data-container='body' data-toggle='tooltip' data-placement='bottom' title='" + element.getDescription() + "'><td width='30%' class='time'>" + element.getLength() 
			+ " min</td><td width='70%' class='activity type-" + element.getTypeId() + "'>" + element.getName() + "</td></tr>";
		});
		tableau += "</tbody>";
		tooltipFunction();
		return tableau;
	}

	// function to display activities per day
	var displayActivitiesDay = function(activityTable,day) {
		var tableau = "<tbody class='connectedSortable'>";
		var time = day.getStartTime();
		var count = 0;
		activityTable.forEach(function(element, index, array) {
			var timeHM;
			if (time % 60 <10){
				timeHM = Math.floor(time/60) + ":0" + time%60;
			} else {
				timeHM = Math.floor(time/60) + ":" + time%60;
			}
			tableau += "<tr id=" + count + " width='100%' draggable='true' data-container='body' data-toggle='tooltip' data-placement='right' title=" + element.getDescription() 
			+ "><td width='30%' class='time'>" + timeHM  + "<p class='duration'>" + " (" + element.getLength() + " min)" 
			+ "</p></td><td width='70%' class='activity type-" + element.getTypeId() + "'>" + element.getName() + "</td></tr>";
			time += element.getLength();
			count ++;
			// tableau += "<tr width='100%' draggable='true' data-container='body' data-toggle='tooltip' data-placement='right' title=" + array[index].getDescription() 
			// + "><td width='30%' class='time'>" + timeHM  + "<p class='duration'>" + " (" + array[index].getLength() + " min)" 
			// + "</p></td><td width='70%' class='activity type-" + array[index].getTypeId() + "'>" + array[index].getName() + "</td></tr>";
			// time += array[index].getLength();
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
			// Compute the activity table
			var table = displayActivitiesDay(element._activities, element);
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
		tooltipFunction();
	}

	model.addObserver(updateView1);
	model.addObserver(updateView2);

}