function resetInputForms() {
	document.getElementById('moneyEntryInputForm').reset();
	RECENT.filters = {};
	RECENT.names = getRecent(RECENT.length);
}

function drawSelectMenu(menu, list) {
	menu = document.getElementById(menu);
	while (menu.children.length != 1) {
		menu.removeChild(menu.lastChild);
	}
	list = list.flat().getUnique();
	for (let i = 0; i < list.length; i++) {
		element = document.createElement('option');
		element.setAttribute('value', list[i].toLowerCase());
		element.innerHTML = list[i];
		menu.appendChild(element);
	}
}

function fillInValue(option) {
	document.getElementById(option.dataset.target).value = option.value;
}

function fillInRecent(option) {
	for (var i = MONEY_ENTRIES.length - 1; i >= 0; i--) {
		if (MONEY_ENTRIES[i].name == option.value) {
			entry = MONEY_ENTRIES[i];
			break;
		}
	}
	document.getElementById('moneyEntryName').value = option.value;
	document.getElementById('moneyEntryCategory').value = entry.category;
	document.getElementById('moneyEntrySubcategory').value = entry.subcategory;
	document.getElementById('moneyEntryAmount').value = entry.amount;
	document.getElementById('moneyEntryComment').value = entry.comment || '';
	option.children[0].selected = 'selected';
}

function categoryChangeEventHandler(option) {
	fillInValue(option);
	drawSelectMenu('nameSelection', getRecent(RECENT.length, { category: `${option.value}` }));
	drawSelectMenu(
		'subcategorySelection',
		propList('subcategory', getByPropertyValues({ category: `${option.value}` }))
	);
	option.children[0].selected = 'selected';
	// reset subcategory input
}

function subcategoryChangeEventHandler(option) {
	fillInValue(option);
	drawSelectMenu('nameSelection', getRecent(RECENT.length, { subcategory: `${option.value}` }));
	option.children[0].selected = 'selected';
}

// the two methods below can be combined by using two arguments
function filterNamesByCategory(option) {
	items = [];
	for (var i = 0; i < MONEY_ENTRIES.length; i++) {
		if (MONEY_ENTRIES[i].category == option.value) {
			items.push(MONEY_ENTRIES[i].name);
		}
	}
	return items;
}

function filterSubcategoriesByCategory(option) {
	items = [];
	for (var i = 0; i < MONEY_ENTRIES.length; i++) {
		if (MONEY_ENTRIES[i].category == option.value) {
			items.push(MONEY_ENTRIES[i].subcategory);
		}
	}
	return items;
}
