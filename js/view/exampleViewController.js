var ExampleViewController = function(view, model) {

//*** VIEW 0 ***
	// Button to add a day
	view.addDayBtn.click(function() {
		view.displayView5(true);
	})

//*** VIEW 1 ***
	// Button to add an activity
	view.addActivityBtn.click(function() {
		view.displayView4(true);
	})
	//
	updateActivityControllers = function() {
		var dd = view.getDisplayedActivitiesListeners("#deleteActivity-");
		model.parkedActivities.forEach(function(element,index,array) {
			dd[index].click(function() {
				// remove activity
				model.removeParkedActivity(index);  
				// remove tooltip activity
				$(".tooltip-inner").remove();
				$(".tooltip-arrow").remove();
			})
		})

	}


//*** VIEW 2 ***
	// Observer that updates the controllers for each day when days in the model change
	updateDayControllers = function() {
		var t = view.getDisplayedDaysListeners("#timepicker-"); // Getting currently displayed timepickers in the view
		var d = view.getDisplayedDaysListeners("#deleteDayBtn-");
		var e = view.getDisplayedDaysListeners("#editDayBtn-");
		model.days.forEach(function(element,index,array) {
			// For the timepickers
			t[index].timepicker().on("changeTime.timepicker",function(e) { // See bootstrap's timepicker documentation
				model.days[index].setStart(e.time.hours, e.time.minutes); //*** TODO - Need to make it work with the AM / PM too
			});
			// For the delete day buttons
			d[index].click(function() {
				model.removeDay(index);
			});
			// For the edit day buttons
			e[index].click(function() {
				view.displayView6(true);
				view.setIndexDay(index);
			})
		});

	// Styling helper
	var fixHelperModified = function(e, tr) {
	    var $originals = tr.children();
	    var $helper = tr.clone();
	    $helper.children().each(function(index) {
	        $(this).width($originals.eq(index).width());
	    });
	    return $helper;
	};

		// Selecting the tbodies that are classed connectedSortable and enabling drag and drop
		$(".translucentContainer")
			.sortable({
				items: "table > tbody > *",
				connectWith:".translucentContainer",
				placeholder: "ui-state-highlight",
				helper:fixHelperModified,
				appendTo:".translucentContainer",
				receive: function(e, ui) {
					ui.item.parent().find('table > tbody').append(ui.item);	// Used when we drop item onto an empty table
				},
				dropOnEmpty: true,
				stop: function(e,ui) {
					var currentDay = ui.item.closest("tbody").attr("id");
					var currentPos = ui.item.index();
					var previousPos = ui.item.data("id");
					var previousDay = e.target.firstElementChild.firstElementChild.id;
					if (previousDay =="parkedTable" && currentDay == "parkedTable") {
						model.moveParked(previousPos,currentPos);
					}
					else if (previousDay =="parkedTable") {
						model.moveActivity(null,previousPos,currentDay,currentPos);
					} else if (currentDay == "parkedTable") {
						model.moveActivity(previousDay,previousPos,null,currentPos);
					}
					else {
						model.moveActivity(previousDay,previousPos,currentDay,currentPos);
					}

				}
			});
	}
	model.addObserver(updateDayControllers);
	model.addObserver(updateActivityControllers);
	view.dayContainer
		.sortable({
			items: ">div",
			stop: function(e,ui) {
				model.moveDay(+ui.item.attr("id").slice(-1),ui.item.index());
			}
		});

//*** VIEW 4 ***
	// Button to cancel the addition (closes the panel)
	view.cancelActivityBtn.click(function() {
		view.displayView4(false);
	})
	// Button to save an activity
	view.saveActivityBtn.click(function() {
		if(view.addActivityTitle.val() == 0 || view.addActivityDuree.val() == 0) { // Testing if we have all needed values (no test on activity type bc it is "work" by default)
			alert("You must choose a title and a duration for your activity! ");
		} else if(isNaN(view.addActivityDuree.val())){ // Is the value an integer?
			alert("You must enter an integer as duration! ");
		} else {
			model.addActivity(new Activity(view.addActivityTitle.val(),
				+view.addActivityDuree.val(),
				ActivityType.indexOf(view.addActivityType.val())+1, // +1 because the types go form 1 to 4 while index goes from 0 to 3 
				view.addActivityDescription.val()));
			// Clearing input fields for next addition
			view.addActivityTitle.val("");
			view.addActivityDuree.val("");
			view.displayView4(false);	
		}
	})

//*** VIEW 5 ***
	// Button to cancel the creation of a new day
	view.cancelcreateDayBtn.click( function(){
		view.displayView5(false);
	})
	// Button to save the creation of a new day
	view.savecreateDayBtn.click( function(){
		model.addDay(view.setStartTimePicker.data('timepicker').hour,
			view.setStartTimePicker.data('timepicker').minute,
			view.newTitleDay.val(),
			view.newLabelDay.val());
		// Clearing input fields for next addition
		view.newTitleDay.val("");
		view.newLabelDay.val("");
		view.displayView5(false);
	})

//*** VIEW 6 ***
	// Button to cancel the edit of day title/label
	view.canceleditDayBtn.click( function() {
		view.displayView6(false);
	})
	// Button to save the edit of day title/label
	view.saveEditDayBtn.click(function() {
			if(view.editTitleDay.val() == 0 || view.editLabelDay.val() == 0){
				alert("You didn't change the title/label of your day!");
			} else {
				var idDay = view.getIndexDay();
				model.days[idDay].setTitle(view.editTitleDay.val());
				model.days[idDay].setLabel(view.editLabelDay.val());
				view.editTitleDay.val("");
				view.editLabelDay.val("");
				view.displayView6(false);
			}
	})


}