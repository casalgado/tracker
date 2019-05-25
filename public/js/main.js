function onLoad(){
	MONEY_ENTRIES = []
	TIME_ENTRIES = []
	ACTIVE_DAY = moment()
	CATEGORIES = []
	SUBCATEGORIES = []
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
			Entry.fetchAllByType('money', user.uid).then(value => {
				MONEY_ENTRIES = value
				return MONEY_ENTRIES
			}).then(value => {
				MoneyEntry.showByPeriod('day', ACTIVE_DAY.unix())
				CATEGORIES = isolateProperty('category', value)
				SUBCATEGORIES = isolateProperty('subcategory', value)
				drawSelectMenu('moneyEntryCategory', CATEGORIES)
				drawSelectMenu('moneyEntrySubCategory', SUBCATEGORIES)
			})
			Entry.fetchAllByType('time', user.uid).then(value => {
				TIME_ENTRIES = value
			})
	  } else {
			document.getElementById('mainContainer').setAttribute('style', 'display:none;')
			alert('User not signed in')
	  }
	});
}

function resetInputForms() {
	document.getElementById('moneyEntryInputForm').reset();
	document.getElementById('timeEntryInputForm').reset();
}

function drawSelectMenu(id, array){
	input = document.getElementById(id)
	while (input.children.length != 1) {
    input.removeChild(input.lastChild);
	}
	array = [... new Set(array.sort())]
	for (var i = 0; i < array.length; i++) {
		element = document.createElement('option')
		element.setAttribute('value', array[i].toLowerCase())
		element.innerHTML = array[i]
		input.appendChild(element)
	}
}

function fillIn(obj, id){
	document.getElementById(id).value = obj.value
}

function filterNamesByCategory(obj){
	items = []
	for (var i = 0; i < MONEY_ENTRIES.length; i++) {
		if (MONEY_ENTRIES[i].category == obj.value) {
			items.push(MONEY_ENTRIES[i].name)
		}
	}
	return items
}

function filterSubcategoriesByCategory(obj){
	items = []
	for (var i = 0; i < MONEY_ENTRIES.length; i++) {
		if (MONEY_ENTRIES[i].category == obj.value) {
			items.push(MONEY_ENTRIES[i].subcategory)
		}
	}
	return items
}
