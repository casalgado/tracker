
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
  	entryBar.id = 'bar' + entry.id
  	entryBar.className = 'entryBar'
  	entryBar.style.width = timeToWidth(entry.end) + 'px'
  	entryBar.style.left = timeToWidth(entry.start) + 'px'
  	cont.appendChild(entryBar)


}

function timeToWidth(date){
	hours = new Date(date).getHours()
	minutes = new Date(date).getMinutes()

	return hours + minutes
}

function minutesToHour(min){
	return parseInt(min)/60
}