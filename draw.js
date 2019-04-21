
function drawEntry(entry) {								           	// draws each entry
	var list = document.getElementById('entryList')			// assigns DOM element entryList to variable

	if (document.getElementById('ec-' + entryYMD(entry))) {			         // determines if an entryContainer has been drawn for an entry
		var cont       = document.getElementById('ec-' + entryYMD(entry))  // with the same date. If so, assigns it to a variable.
		var visualCont = document.getElementById('vc-' + entryYMD(entry))  // Also assigns visual container and date container to variable.
		var dateCont   = document.getElementById('dc-' + entryYMD(entry))
	}
	else {
		var cont = document.createElement('div')			// if no entryContainer exists for that day, draws it.
		cont.className = 'entryContainer'				    	// and appends it to entryList
		cont.id = 'ec-' + entryYMD(entry)
		list.appendChild(cont)

		var visualCont = document.createElement('div')		// creates a visualization container to hold the
		visualCont.className = 'visualContainer' 		    	// entry visualization
		visualCont.id = 'vc-' + entryYMD(entry)
		cont.appendChild(visualCont)

		var dateCont = document.createElement('p')		// creates a date container to hold date data for entry
		dateCont.className = 'dateContainer'
		dateCont.id = 'dc-' + entryYMD(entry)
		dateCont.innerHTML = moment(entry.start).format('dd MMM D')
		cont.prepend(dateCont)

		for (var i = 0; i < 24; i++) {					        	// creates segments used to mark the time of day
	    	var segment = document.createElement('div')	 	// appends them to entryContainer
	    	segment.className = 'hourSegment hs' + i
	    	visualCont.appendChild(segment)
	  }
	}
															// creates entry bar, used to visualize time and duration of entry
  	var entryBar   = document.createElement('div')            // creates DOM elemens
  	var entryStart = parseFloat(timeToWidth(entry.start))     // calculates starting position
  	var entryEnd   = parseFloat(timeToWidth(entry.end))       // and width, based on entry data
  	entryBar.id = entry.id 																    // sets element id
  	entryBar.className   = 'entryBar entryType' + entry.type				// class
  	entryBar.style.left  = entryStart + '%'						  						// start
  	entryBar.style.width = entryEnd - entryStart + '%'    			    // duration
		entryBar.addEventListener('mouseover', appendPopover)						// and event listeners
		entryBar.addEventListener('mouseover', showPopOver);
  	visualCont.appendChild(entryBar)	        			    // appends entryBar to visualContainer
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

function appendPopover(e){                    // appends popOver to visual container
	var popOver = document.getElementById('popOver')
	e.target.parentElement.appendChild(popOver)   // target in this case is hour segment. parentElement selects visualCont
	console.log(e.target)
}

function updatePopoverPosition(popOver, target){
	var targetStyle = window.getComputedStyle(target)
	popOver.style.top  = parseFloat(targetStyle.top) + parseFloat(targetStyle.height) - 100 + 'px'
	popOver.style.left = parseFloat(targetStyle.left) + parseFloat(targetStyle.width)/2 - 50 + 'px'
}

function elevateEntryBars(target){										// modifies zindex of entryBars in current visualCont
	var children = target.parentElement.childNodes		  // this is done to keep popover below entry bars in current visualCont and above all other entry bars.
	for (var i = 0; i < children.length; i++) {
		if (children[i].className.includes('entryBar')) {
			children[i].style.zIndex = '2'
		}
	}
}

function flattenEntryBars(){   													// resets all entryBar z-index property
	var entryBars = document.getElementsByClassName("entryBar")
	for (var i = 0; i < entryBars.length; i++) {
		entryBars[i].style.zIndex = '0'
	}
}

function updatePopoverContent(target){
	var start    = document.getElementById('startDesc').innerHTML = 'Start ' + moment(getEntry(target.id).start).format('HH:mm')
	var end      = document.getElementById('endDesc').innerHTML = 'End ' + moment(getEntry(target.id).end).format('HH:mm')
	var duration = document.getElementById('durationDesc').innerHTML = 'Duration: '
}

var holdPopOver = function(e) {
	document.getElementById('popOver').style.display = 'block'
}


var showPopOver = function(e) {
    var popOver = document.getElementById('popOver')
		popOver.style.display = 'block'
		elevateEntryBars(e.target)
		updatePopoverPosition(popOver, e.target)
		updatePopoverContent(e.target)
};

var hidePopOver = function(e) {
    document.getElementById('popOver').style.display = 'none'
    document.getElementById('popOver').style.zIndex = '1'
		flattenEntryBars()
};
