
// function drawEntry(entry) {
//
// 	if (dayExists(entry)) {
// 		var dayVisualization = document.getElementById('dv-' + getDateString(entry))
// 	} else {
// 		var entryList        = document.getElementById('entryList')
// 		var dayContainer     = createDayContainer(entry)
// 		var dayTitle         = createDayTitle(entry)
// 		var dayVisualization = createDayVisualization(entry)
//
// 		entryList.prepend(dayContainer)
// 		dayContainer.appendChild(dayTitle)
// 		dayContainer.appendChild(dayVisualization)
// 	}
//
//   	var entryBar   = createEntryBar(entry)
//   	dayVisualization.appendChild(entryBar)
// }

function createDayContainer(entry){
	var dayContainer = document.createElement('div')
	dayContainer.id = 'dc-' + getDateString(entry)
	return dayContainer
}

function createDayTitle(entry){
	var dayTitle = document.createElement('p')
	dayTitle.className = 'dayTitle'
	dayTitle.id = 'dt-' + getDateString(entry)
	dayTitle.innerHTML = moment(entry.start).format('dd MMM D')
	return dayTitle
}

function createDayVisualization(entry){
	var dayVisualization = document.createElement('div')
	dayVisualization.className = 'dayVisualization'
	dayVisualization.id = 'dv-' + getDateString(entry)
	createHourSegments(dayVisualization)
	return dayVisualization
}

function createHourSegments(dayVisualization) {
	for (var i = 0; i < 24; i++) {
			var segment = document.createElement('div')
			segment.className = 'hourSegment hs' + i
			dayVisualization.appendChild(segment)
	}
}

function createEntryBar(entry){
	var entryBar   = document.createElement('div')
	var entryStart = parseFloat(timeToPercentage(entry.start))
	var entryEnd   = parseFloat(timeToPercentage(entry.end))
	entryBar.id = entry.id
	entryBar.className   = 'entryBar entryType' + entry.type
	entryBar.style.left  = entryStart + '%'
	entryBar.style.width = (entryEnd - entryStart) + '%'
	entryBar.addEventListener('mouseover', showPopOver)
	return entryBar
}

function drawLegend() {
		legend = document.getElementById('legend')
		for (var i = 0; i < 24; i++) {
	    	var segment = document.createElement('p')
	    	segment.className = 'legendSegment'
	    	segment.innerHTML = ("0" + i).slice(-2) + ":00"
	    	legend.appendChild(segment)
	  	}
}

function timeToPercentage(time){
	date = moment(time)
	hours = date.hours()
	minutes = date.minutes()/60
	return Math.round(parseFloat((hours + minutes)*100/24)*1000)/1000
}
