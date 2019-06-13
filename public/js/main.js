function onLoad() {
	MONEY_ENTRIES = [];
	TIME_ENTRIES = [];
	SHOWING = { period: 'day', current: moment() };
	CATEGORIES = [];
	SUBCATEGORIES = [];
	RECENT = { filter: {}, length: 20, names: [] };
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			loadPage(user);
		} else {
			document.getElementById('landingContainer').setAttribute('style', 'display:block');
		}
	});
}

function loadPage(user) {
	resetInputForms();
	Entry.fetchAllByType('money', user.uid)
		.then((entries) => {
			MONEY_ENTRIES = entries;
			return MONEY_ENTRIES;
		})
		.then((entries) => {
			MoneyEntry.show('day', SHOWING.current.unix());
			CATEGORIES = propList('category', entries).sort();
			SUBCATEGORIES = propList('subcategory', entries).sort();
			RECENT.names = getRecent(RECENT.length);
			drawSelectMenu('nameSelection', RECENT.names);
			drawSelectMenu('categorySelection', CATEGORIES);
			drawSelectMenu('subcategorySelection', SUBCATEGORIES);
			document.getElementById('landingContainer').setAttribute('style', 'display:none;');
			document.getElementById('loaderContainer').setAttribute('style', 'display:none;');
			document.getElementById('mainContainer').setAttribute('style', 'display:block;');
			document.getElementById('mainContainer').velocity({ opacity: '1' }, { duration: 200 });
		});
	Entry.fetchAllByType('time', user.uid).then((entries) => {
		TIME_ENTRIES = entries;
	});
}

function signInUser() {
	var email = document.getElementById('signInEmail').value;
	var password = document.getElementById('signInPassword').value;
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
		})
		.then(() => {
			loadPage(firebase.auth().currentUser);
		});
}
