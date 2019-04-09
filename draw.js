
function draw(entry) {
	var list = document.getElementById('entryList')
	var cont = document.createElement('div')
	cont.className = 'entryContainer'
	list.appendChild(cont)

	for (var i = 0; i < 24; i++) {
    	var segment = document.createElement('div')
    	segment.className = 'dateSegment'
    	cont.appendChild(segment)
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