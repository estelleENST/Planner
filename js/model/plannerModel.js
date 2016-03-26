// this is our main module that contains days and praked activites
function Model(){
	this.days = [];
	this.parkedActivities = [];
	
	// adds a new day. if startH and startM (start hours and minutes)
	// are not provided it will set the default start of the day to 08:00
	this.addDay = function (startH,startM,title,label) {
		var day;
		if(startH){
			day = new Day(startH,startM);
		} else {
			day = new Day(8,0);
		}
		if(title){ // If we give the day a title
			day.setTitle(title);
		} else { // Otherwise it's Day X
			day.setTitle("Day " + +this.days.length);
		}
		if (label) // If we give the day a label, otherwise it stays as "label" by default
			day.setLabel(label);
		this.days.push(day);
		this.notifyObservers();
		return day;
	};
	
	// add an activity to model
	this.addActivity = function (activity,day,position) {
		if(day != null) {
			this.days[day]._addActivity(activity,position);
		} else {
			if (position != null) {
				this.parkedActivities.splice(position,0,activity);
			}
			else this.parkedActivities.push(activity);
		}
		this.notifyObservers();
	}
	
	// add an activity to parked activities
	this.addParkedActivity = function(activity,position){
		this.addActivity(activity,null,position);
	};
	
	// remove an activity on provided position from parked activites 
	this.removeParkedActivity = function(position) {
		act = this.parkedActivities.splice(position,1)[0];
		this.notifyObservers();
		return act;
	};
	
	// moves activity between the days, or day and parked activities.
	// to park activity you need to set the new day to null
	// to move a parked activity to let's say day 0 you set oldday to null
	// and new day to 0
	this.moveActivity = function(oldday, oldposition, newday, newposition) {
		if(oldday !== null && oldday == newday) {
			this.days[oldday]._moveActivity(oldposition,newposition);
		}else if(oldday == null && newday == null) {
			var activity = this.removeParkedActivity(oldposition);
			this.addParkedActivity(activity,newposition);
		}else if(oldday == null) {
			var activity = this.removeParkedActivity(oldposition);
			this.days[newday]._addActivity(activity,newposition);
		}else if(newday == null) {
			var activity = this.days[oldday]._removeActivity(oldposition);
			this.addParkedActivity(activity,newposition);
		} else {
			var activity = this.days[oldday]._removeActivity(oldposition);
			this.days[newday]._addActivity(activity,newposition);
		}
		this.notifyObservers();
	};

	// removes a day and parks the removed day's activities
	this.removeDay = function(dayIndex) {
		var j = this.days[dayIndex]._activities.length
		for (var i = 0; i < j; i++) {
			this.moveActivity(dayIndex,0,null); // Each time we move an activity to the parked activity list, the others go down a position.
		}
		this.days.splice(dayIndex,1);
		this.notifyObservers();
	}
	
	// moves a day
	this.moveDay = function(oldposition,newposition) {
		var newDay = this.days.splice(oldposition,1)[0];
		this.days.splice(newposition,0,newDay);
		this.notifyObservers();
	};

	// moves parked activities order
	this.moveParked = function(oldposition,newposition) {
		// In case new position is greater than the old position and we are not moving
		// to the last position of the array
		if(newposition > oldposition && newposition < this._activities.length - 1) {
			newposition--;
		}
		var activity = this.removeParkedActivity(oldposition);
		this.addParkedActivity(activity, newposition);
		this.notifyObservers();
	}

	//*** OBSERVABLE PATTERN ***
	var listeners = [];
	
	this.notifyObservers = function (args) {
		for (var i = 0; i < listeners.length; i++){
			listeners[i](args);
		}
	};
	
	this.addObserver = function (listener) {
		listeners.push(listener);
	};
	//*** END OBSERVABLE PATTERN ***
}