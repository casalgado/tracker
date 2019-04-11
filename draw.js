
function draw(entry) {
	var list = document.getElementById('entryList')

	if (document.getElementById(entryYMD(entry))) {
		var cont = document.getElementById(entryYMD(entry))
	} else {
		var cont = document.createElement('div')
		cont.className = 'entryContainer'
		cont.id = entryYMD(entry)
		list.appendChild(cont)

		for (var i = 0; i < 24; i++) {
	    	var segment = document.createElement('div')
	    	segment.className = 'dateSegment'
	    	cont.appendChild(segment)
	  	}
	}
	

  	var entryBar = document.createElement('div')
  	var entryStart = parseFloat(timeToWidth(entry.start))
  	var entryEnd = parseFloat(timeToWidth(entry.end))
  	entryBar.id = 'bar' + entry.id
  	entryBar.className = 'entryBar'
  	entryBar.style.width = entryEnd - entryStart + '%'
  	entryBar.style.left = entryStart + '%'

  	cont.appendChild(entryBar)
}



function timeToWidth(date){
	time = moment(date)
	hours = time.hours()
	minutes = time.minutes()/60

	return ((hours + minutes)*100/24).toFixed(2)
}

function minutesToHour(min){
	return parseInt(min)/60
}

function entryYMD(entry) { // returns a string with date of entry, to use as id of container
	t = moment(entry.start)
	return `${t.format('Y')}-${t.format('MM')}-${t.format('DD')}`
}

