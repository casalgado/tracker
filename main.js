
function onLoad(){
	POSSIBLE_TYPES = getPossibleTypesOfEntries()
	document.getElementById('entryInputForm').addEventListener('submit', createEntry);
	document.getElementById('popoverContainer').addEventListener('mouseover', holdPopOver)
	document.getElementById('popoverContainer').addEventListener('mouseleave', hidePopOver)
	focusStart()
	fetchEntries()
	drawLegend()
}

function fetchEntries () {

  var entries = allEntries()
  var entryList = document.getElementById('entryList');

	// popover should be removed from entryList or it will be deleted when reseting it.
	document.getElementById('mainContainer').appendChild(document.getElementById('popoverContainer'))
  entryList.innerHTML = '';

  for (var i = 0; i < entries.length; i++) {
    drawEntry(entries[i])
  }
}

function moveFocus(num, limit, func) {
  if (num.length === limit) {
    func()
  }
}

function focusEnd() {
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

function resetInputForm() {
	document.getElementById('entryInputForm').reset();
}
