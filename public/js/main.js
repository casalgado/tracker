
function onLoad(){
	POSSIBLE_TYPES = []
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
			fetchEntries(user.uid)
	  } else {
			alert('User not signed in')
	  }
	});
	document.getElementById('timeEntryInputForm').addEventListener('submit', createTimeEntry);
	document.getElementById('moneyEntryInputForm').addEventListener('submit', createMoneyEntry);
}

function fetchEntries (userId) {
	var timeEntryList  = document.getElementById('timeEntryList');
  var moneyEntryList = document.getElementById('moneyEntryList');
	timeEntryList.innerHTML = ''
	moneyEntryList.innerHTML = ''

  allEntries('time', userId).then(value => {
		for (var i = 0; i < value.length; i++) {
	    drawEntry(value[i], timeEntryList)
	  }
	})

	allEntries('money', userId).then(value => {
		for (var i = 0; i < value.length; i++) {
	    drawEntry(value[i], moneyEntryList)
	  }
	})
}

function drawEntry(entry, element) {
	li = document.createElement('li')
	li.innerHTML = JSON.stringify(entry)
	element.appendChild(li)
}

function separateObject(obj){
	var keys = []
	var values = []
	for (var prop in obj) {
		keys.push(prop)
		values.push(obj[prop])
	}
	return [keys, values]
}

function resetInputForms() {
	document.getElementById('moneyEntryInputForm').reset();
	document.getElementById('timeEntryInputForm').reset();
}
