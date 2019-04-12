
function drawEntry(entry) {									// draws each entry
	var list = document.getElementById('entryList')			// assigns DOM element entryList to variable 


	if (document.getElementById(entryYMD(entry))) {			// determines if an entryContainer has been drawn for an entry
		var cont = document.getElementById(entryYMD(entry)) // with the same date. If so, assigns it to a variable.
	} else {
		var cont = document.createElement('div')			// if no entryContainer exists for that day, draws it. 
		cont.className = 'entryContainer'					// and appends it to entryList
		cont.id = entryYMD(entry)
		list.appendChild(cont)

		for (var i = 0; i < 24; i++) {						// creates segments used to mark the time of day
	    	var segment = document.createElement('div')	 	// appends them to entryContainer
	    	segment.className = 'hourSegment'
	    	cont.appendChild(segment)
	  	}
	}
															// creates entry bar, used to visualize time and duration of entry
  	var entryBar = document.createElement('div')            // creates DOM elemens
  	var entryStart = parseFloat(timeToWidth(entry.start))   // calculates starting position
  	var entryEnd = parseFloat(timeToWidth(entry.end))       // and width, based on entry data
  	entryBar.id = 'bar' + entry.id 							// sets element attributes: id
  	entryBar.className = 'entryBar'							// class
  	entryBar.style.left = entryStart + '%'					// start
  	entryBar.style.width = entryEnd - entryStart + '%'	    // duration

  	cont.appendChild(entryBar)								// appends entryBar to entry Container
}

function drawLegend() {										// draws legend to be used atop entry list
		cont = document.getElementById('legendContainer')
		for (var i = 0; i < 24; i++) {						// draws one segment per hour of the day
	    	var segment = document.createElement('p')
	    	segment.className = 'legendSegment'
	    	segment.innerHTML = ("0" + i).slice(-2) + ":00"
	    	cont.appendChild(segment)
	  	}
}


function timeToWidth(date){									// converts a time format to a % width, used by drawEntry
	time = moment(date)
	hours = time.hours()
	minutes = time.minutes()/60
	return ((hours + minutes)*100/24).toFixed(2)
}

function entryYMD(entry) { 									// returns a string with date of entry, to use as id of entryContainer
	t = moment(entry.start)
	return `${t.format('Y')}-${t.format('MM')}-${t.format('DD')}`
}

