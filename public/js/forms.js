
function resetInputForms() {
	document.getElementById('moneyEntryInputForm').reset();
}

function drawSelectMenu(menu, list){
	menu = document.getElementById(menu)
	while (menu.children.length != 1) {
    	menu.removeChild(menu.lastChild);
	}
	list = [... new Set(list.flat().sort())]
	for (let i = 0; i < list.length; i++) {
		element = document.createElement('option')
		element.setAttribute('value', list[i].toLowerCase())
		element.innerHTML = list[i]
		menu.appendChild(element)
	}
}

function fillInCategory(option){
	document.getElementById(option.dataset.target).value = option.value
	option.children[0].selected = 'selected'
}

function fillInFrequent(option){
	var entry
	for (var i = MONEY_ENTRIES.length -1 ; i >= 0; i--) {
		if (MONEY_ENTRIES[i].name == option.value) {
			entry = MONEY_ENTRIES[i]
			break
		}
	}
	document.getElementById('moneyEntryName').value = option.value
	document.getElementById('moneyEntryAmount').value  = entry.amount
	document.getElementById('moneyEntryComment').value = entry.comment || ""
	option.children[0].selected = 'selected'
}


// the two methods below can be combined by using two arguments
function filterNamesByCategory(option){
	items = []
	for (var i = 0; i < MONEY_ENTRIES.length; i++) {
		if (MONEY_ENTRIES[i].category == option.value) {
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