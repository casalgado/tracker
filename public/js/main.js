
function onLoad(){
	POSSIBLE_TYPES = []
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
			setTimeout(function(){fetchEntries(user.uid)}, 0)
			setTimeout(function(){fetchEntries(user.uid)}, 1000)
	  } else {

	  }
	});
	document.getElementById('timeEntryInputForm').addEventListener('submit', createTimeEntry);
	document.getElementById('moneyEntryInputForm').addEventListener('submit', createMoneyEntry);
}

function fetchEntries (userId) {
  var timeEntries    = allEntries('time', userId)
  var moneyEntries   = allEntries('money', userId)
  var timeEntryList  = document.getElementById('timeEntryList');
  var moneyEntryList = document.getElementById('moneyEntryList');
	timeEntryList.innerHTML = ''
	moneyEntryList.innerHTML = ''
  for (var i = 0; i < timeEntries.length; i++) {
    drawEntry(timeEntries[i], timeEntryList)
  }

	for (var i = 0; i < moneyEntries.length; i++) {
    drawEntry(moneyEntries[i], moneyEntryList)
  }
}

function drawEntry(entry, element) {
	li = document.createElement('li')
	li.innerHTML = JSON.stringify(entry)
	element.appendChild(li)
}


function moveFocus(num, limit, func) {
  if (num.length === limit) {
    func()
  }
}

function focusTimeEnd() {
  document.getElementById('timeEntryEnd').focus()
}

function focusTimeStart() {
  document.getElementById('timeEntryStart').focus()
}

function focusTimeDay() {
  document.getElementById('timeEntryDay').focus()
}

function focusTimeMonth() {
  document.getElementById('timeEntryMonth').focus()
}

function focusTimeYear() {
  document.getElementById('timeEntryYear').focus()
}

function focusTimeCategory() {
	document.getElementById('timeEntryCategory').focus()
}

function resetInputForms() {
	document.getElementById('moneyEntryInputForm').reset();
	document.getElementById('timeEntryInputForm').reset();
}
