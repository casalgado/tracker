
function onLoad(){
	MONEY_ENTRIES = []
	TIME_ENTRIES = []
	ACTIVE_DAY = moment()
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
			Entry.fetchAllByType('money', user.uid).then(value => {
				MONEY_ENTRIES = value
			}).then(() => {
				MoneyEntry.showByPeriod('day', ACTIVE_DAY.unix())
			})
			Entry.fetchAllByType('time', user.uid).then(value => {
				TIME_ENTRIES = value
			})
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

  Entry.fetchAllByType('time', userId).then(value => {
		for (var i = 0; i < value.length; i++) {
	    drawEntry(value[i], timeEntryList)
	  }
	})

	Entry.fetchAllByType('money', userId).then(value => {
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

function resetInputForms() {
	document.getElementById('moneyEntryInputForm').reset();
	document.getElementById('timeEntryInputForm').reset();
}
