
function fetchEntries () {

  var entries = JSON.parse(localStorage.getItem('entries')) || []
  var entryList = document.getElementById('entryList');
  
  entryList.innerHTML = '';
  
  for (var i = 0; i < entries.length; i++) {
    draw(entries[i])
  }
}

document.getElementById('entryInputForm').addEventListener('submit', saveEntry);

function saveEntry(e) {
  if (localStorage.getItem('entries') === null) {
    var entryId = 1;
  } else {
    var entryId = JSON.parse(localStorage.getItem('entries')).length + 1
  }

  // values from form
  var start = document.getElementById('entryStart').value
  var end   = document.getElementById('entryEnd').value
  var day   = document.getElementById('entryDay').value
  var month = document.getElementById('entryMonth').value
  var year  = document.getElementById('entryYear').value

  var entryStart = convertToDate(start, day, month, year);
  var entryEnd = convertToDate(end, day, month, year);

  var entry = {
    id: entryId,
    start: entryStart,
    end: entryEnd,
  }
  
  if (localStorage.getItem('entries') === null) {
    var entries = [];
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
  } else {
    var entries = JSON.parse(localStorage.getItem('entries'));
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
  }
  
  document.getElementById('entryInputForm').reset();

  fetchEntries();
  e.preventDefault();
  focusStart();

}

function convertToDate(eHourMinute, eDay, eMonth, eYear) { // takes form parameters as strings and returns a date format. Is called by saveEntry().
	t = moment()
	minutes = eHourMinute.substring(2,4)
	hours   = eHourMinute.substring(0,2)
	day     = eDay || t.format('DD')
	month   = eMonth || t.format('MM')
	year    = eYear || t.format('Y')
	entryDate = moment(`${year}-${month}-${day}T${hours}:${minutes}:00`)
	return entryDate
}

var moveFocus = function moveFocus(num, limit) {
  if (num.length === limit) {
    focusEnd()
  }
}

function focusEnd() {
  document.getElementById('entryEnd').focus()
}

function focusStart() {
  document.getElementById('entryStart').focus()
}
