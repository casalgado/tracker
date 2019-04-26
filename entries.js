

function Entry(id, start, end, type) {
  this.id    = id;
  this.start = start;
  this.end   = end;
  this.type  = type;
}

function calculateDuration(entry){
  return moment.duration(moment(entry.end).diff(moment(entry.start))).as('minutes') + ' minutes'
}

// returns array object with all entries
function allEntries(){
  return JSON.parse(localStorage.getItem('entries'))
}

// toggles through possible types
function toggleType(entryId){
  entry = getEntry(entryId)
  types = []
  allEntries().forEach(function(e){ // this method can be abstracted so it runs only once, onLoad, and returns an array of types
    types.push(parseInt(e.type))
  })
  possibleTypes = [...new Set(types)].sort()
  i = possibleTypes.indexOf(parseInt(entry.type))
  newType = possibleTypes[(i + 1 + possibleTypes.length) % possibleTypes.length]
  updateEntryType(entryId, newType)
}


function deleteEntry(entryId){
  var entries = JSON.parse(localStorage.getItem('entries'));

  for(var i = 0; i < entries.length; i++) {
    if (entries[i].id == entryId) {
      entries.splice(i, 1);
    }
  }
  localStorage.setItem('entries', JSON.stringify(entries));
  fetchEntries();
}

function updateEntryType(entryId, newType){
	var entries = allEntries()
	for(var i = 0; i < entries.length; i++) {
		if (entries[i].id == entryId) {
			entries[i].type = newType
      entrybar = document.getElementById(entries[i].id)
      entrybar.className = "entryBar entryType" + newType  // this can be improved
			break
		}
	}
	localStorage.setItem('entries', JSON.stringify(entries));
}

function getEntry(entryId){
	var entries = JSON.parse(localStorage.getItem('entries'))
	var entry = {}
	for(var i = 0; i < entries.length; i++) {
		if (entries[i].id == entryId) {
			entry = entries[i]
			break
		}
	}
	return entry
}

function sortEntries(array){                                     // sorts entry array in reverse order
	array.sort(function(a, b) {									                   // returns latest entry first
		time1 = moment(a.start)
		time2 = moment(b.start)
    	return time2 - time1;
	});
	return array
}

function convertToDate(eHourMinute, eDay, eMonth, eYear) { 		 // takes form parameters as strings and returns a date format. Is called by saveEntry().
	t = moment()
	minutes   = eHourMinute.substring(2,4)
	hours     = eHourMinute.substring(0,2)
	day       = eDay   || t.format('DD')
	month     = eMonth || t.format('MM')
	year      = eYear  || t.format('Y')
	entryDate = moment(`${year}-${month}-${day}T${hours}:${minutes}:00`)
	return entryDate
}

function entryYMD(entry) { 									// returns a string with date of entry, to use as id of entryContainer
	t = moment(entry.start)
	return `${t.format('Y')}-${t.format('MM')}-${t.format('DD')}`
}
