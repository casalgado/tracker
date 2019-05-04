
class Entry{
  constructor(id, start, end, type){
    this.id    = id;
    this.start = start;
    this.end   = end;
    this.type  = type;
  }
}

function allEntries(){
  var entries = localStorage.getItem('entries') || "[]"
  return JSON.parse(entries)
}

function getEntry(entryId){
	var entries = allEntries()
	var entry = {}
	for(var i = 0; i < entries.length; i++) {
		if (entries[i].id == entryId) {
			entry = entries[i]
			break
		}
	}
	return entry
}

function createEntry(e) {

  var entryId    = newEntryId()
  var entryType  = document.getElementById('entryType').value

  var start_time = document.getElementById('entryStart').value
  var end_time   = document.getElementById('entryEnd').value
  var day        = document.getElementById('entryDay').value
  var month      = document.getElementById('entryMonth').value
  var year       = document.getElementById('entryYear').value

  var entryStart = convertToDate(start_time, day, month, year);
  var entryEnd   = convertToDate(end_time, day, month, year);

  var entry = new Entry(entryId, entryStart, entryEnd, entryType)

  saveEntry(entry);
  drawEntry(entry);

  e.preventDefault();
  resetInputForm();
  focusStart();
}

function saveEntry(entry){
  var entries = allEntries()
	entries.push(entry);
  localStorage.setItem('entries', JSON.stringify(entries));
}

function updateEntry(entry){
  var entries = allEntries()
	for(var i = 0; i < entries.length; i++) {
		if (entries[i].id == entry.id) {
			break
		}
	}
  entries[i] = entry
  localStorage.setItem('entries', JSON.stringify(entries));
}

function deleteEntry(entryId){
  var entries = allEntries()
  for(var i = 0; i < entries.length; i++) {
    if (entries[i].id == entryId) {
      entries.splice(i, 1);
    }
  }
  localStorage.setItem('entries', JSON.stringify(entries));
  deleteEntryBar(entryId)
}

function newEntryId(){
  var entries = allEntries()
  var maxId = entries.reduce(function(currentMax, currentValue) {
    return Math.max(currentMax, currentValue.id)
  }, 0)
  return maxId + 1
}

function changeType(entryId){
  entry = getEntry(entryId)
  entry.type = getNextPossibleType(entry)
  recolorEntryBar(entry)
	updateEntry(entry)
}

function calculateDuration(entry){
  return moment.duration(moment(entry.end).diff(moment(entry.start))).as('minutes') + ' minutes'
}

function getNextPossibleType(entry){
  i = POSSIBLE_TYPES.indexOf(parseInt(entry.type))
  newType = POSSIBLE_TYPES[(i + 1 + POSSIBLE_TYPES.length) % POSSIBLE_TYPES.length]
  return newType
}

function getPossibleTypesOfEntries(){
  types = []
  allEntries().forEach(function(e){
    types.push(parseInt(e.type))
  })
  possibleTypes = [...new Set(types)].sort()
  return possibleTypes
}

function clearDatabase(){
  if (confirm("are you sure?")) {
    localStorage.setItem('entries', "");
  }
  fetchEntries()
}

// takes form parameters as strings and returns a date format. Is called by createEntry().
function convertToDate(eHourMinute, eDay, eMonth, eYear) {
	t = moment()
	minutes   = eHourMinute.substring(2,4)
	hours     = eHourMinute.substring(0,2)
	day       = eDay   || t.format('DD')
	month     = eMonth || t.format('MM')
	year      = eYear  || t.format('Y')
	entryDate = moment(`${year}-${month}-${day}T${hours}:${minutes}:00`)
	return entryDate
}

// methods below are used to draw entry
function getDateString(entry) {
	t = moment(entry.start)
	return `${t.format('Y')}-${t.format('MM')}-${t.format('DD')}`
}

function recolorEntryBar(entry){
  entrybar = document.getElementById(entry.id)
  entrybar.className = "entryBar entryType" + entry.type
}

function deleteEntryBar(entryId) {
  document.getElementById(entryId).style.display = 'none'
  // it would be nice to add a method that deletes the entryBar container if it was the only entry of the day
}

function dayExists(entry){
   if (document.getElementById('dc-' + getDateString(entry))) { return true }
}
