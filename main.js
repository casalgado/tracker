
function onLoad(){
	document.getElementById('entryInputForm').addEventListener('submit', saveEntry);  // attaches saveEntry() to form 'submit' button
	document.getElementById('popOver').addEventListener('mouseover', holdPopOver)
	document.getElementById('popOver').addEventListener('mouseleave', hidePopOver)
	focusStart()
	fetchEntries()
	drawLegend()
}

function fetchEntries () {  // fetches all entries and calls the drawEntry function for each one.

  var entries = allEntries() || []  // parses entry data object from localStorage
  sortEntries(entries)											   // and sorts it
  var entryList = document.getElementById('entryList');            // gets DOM object Entry list

  entryList.innerHTML = '';										   // empties DOM object Entry List

  for (var i = 0; i < entries.length; i++) {					   // iterates through entry data
    drawEntry(entries[i])										   // calls draw() for each entry
  }
}

function saveEntry(e) {											   // saves entry, called by for submit.
  if (localStorage.getItem('entries') === null) {
    var entryId = 1;
  } else {
    var entryId = JSON.parse(localStorage.getItem('entries')).length + 1
  }																// sets entry ID's


  var entryType = document.getElementById('entryType').value       // gets values from form
  var start     = document.getElementById('entryStart').value
  var end       = document.getElementById('entryEnd').value
  var day       = document.getElementById('entryDay').value
  var month     = document.getElementById('entryMonth').value
  var year      = document.getElementById('entryYear').value

  var entryStart = convertToDate(start, day, month, year);      // converts values to date formats
  var entryEnd   = convertToDate(end, day, month, year);        // combines all values into two attributes, start and end

  var entry = new Entry( entryId, entryStart, entryEnd, entryType)

  if (localStorage.getItem('entries') === null) {				// saves entry in local storage
    var entries = [];											// if no entries exists, creates entries array
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
  } else {
    var entries = JSON.parse(localStorage.getItem('entries'));  // if entries exist, rewrites 'entries' array
    entries.push(entry);										// after retreiving it and pushing the latest entry
    localStorage.setItem('entries', JSON.stringify(entries));
  }

  document.getElementById('entryInputForm').reset();             // resets input form


  e.preventDefault();
  focusStart();																			// focuses start
	fetchEntries();  																	// fetches entries once more
}

var moveFocus = function moveFocus(num, limit, func) {           // moves focus to target element after a number of characters
  if (num.length === limit) {									 // has been added to form group. Used to speed up entry input.
    func()
  }
}

function focusEnd() {											 // focus methods called by moveFocus()
  document.getElementById('entryEnd').focus()
}

function focusStart() {
  document.getElementById('entryStart').focus()
}

function focusDay() {
  document.getElementById('entryDay').focus()
}

function focusMonth() {
  document.getElementById('entryMonth').focus()
}

function focusYear() {
  document.getElementById('entryYear').focus()
}

function focusType() {
	document.getElementById('entryType').focus()
}
