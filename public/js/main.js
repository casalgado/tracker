function onLoad(){
	MONEY_ENTRIES = []
	TIME_ENTRIES = []
	SHOWING = { period:'day', current: moment()}
	CATEGORIES = []
	SUBCATEGORIES = []
	POPOVER_AT = {}
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
			loadPage(user)
	  } else {
			document.getElementById('landingContainer').setAttribute('style', 'display:block')
	  }
	});
}

function loadPage(user){
	document.getElementById('signInForm').setAttribute('style', 'display:none;')
	document.getElementById('mainContainer').setAttribute('style', 'display:block;')
	Entry.fetchAllByType('money', user.uid).then(value => {
		MONEY_ENTRIES = value
		return MONEY_ENTRIES
	}).then(value => {
		MoneyEntry.show('day', SHOWING.current.unix())
		CATEGORIES = isolateProperty('category', value)
		SUBCATEGORIES = isolateProperty('subcategory', value)
		drawSelectMenu('moneyEntryCategory', CATEGORIES)
		drawSelectMenu('moneyEntrySubCategory', [CATEGORIES, SUBCATEGORIES])
	})
	Entry.fetchAllByType('time', user.uid).then(value => {
		TIME_ENTRIES = value
	})
}

function signInUser(){
	var email = document.getElementById('signInEmail').value
	var password = document.getElementById('signInPassword').value
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
		var errorMessage = error.message;
	}).then(()=> {loadPage(firebase.auth().currentUser)});
}


