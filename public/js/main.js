
function onLoad(){
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
			fetchEntries(user.uid)
	  } else {
			alert('User not signed in')
	  }
	});
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

function fetchTodaysEntries (userId) {
	var timeEntryList  = document.getElementById('timeEntryList');
  var moneyEntryList = document.getElementById('moneyEntryList');
	timeEntryList.innerHTML = ''
	moneyEntryList.innerHTML = ''

  todaysEntries('time', userId).then(value => {
		for (var i = 0; i < value.length; i++) {
	    drawEntry(value[i], timeEntryList)
	  }
	})

	todaysEntries('money', userId).then(value => {
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
