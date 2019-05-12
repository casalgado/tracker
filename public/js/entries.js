function TimeEntry(start, end, category, eid){
    this.start    = start;
    this.end      = end;
    this.category = category;
    this.eid      = eid;
    this.duration = function (){
      return moment.duration(moment(this.end).diff(moment(this.start))).as('minutes') + ' minutes'
    }
}

function MoneyEntry(name, amount, category, subcategory, comment, date, eid){
    this.name        = name;
    this.amount      = amount;
    this.category    = category;
    this.subcategory = subcategory;
    this.comment     = comment;
    this.date        = date;
    this.eid         = eid;
}

function allEntries(type, userId){
  all = []
  entries = firebase.database().ref(type + 'Entries')
  entries.orderByChild("uid").equalTo(userId).on("value", function(snapshot) {
    switch (type) {
      case 'money':
          snapshot.forEach(function(entry) {
            all.push(new MoneyEntry(entry.val().name, entry.val().amount, entry.val().category, entry.val().subcategory, entry.val().comment, entry.val().date, entry.key))
          });
        break;
      case 'time':
          snapshot.forEach(function(entry) {
            all.push(new TimeEntry(entry.val().start, entry.val().end, entry.val().category, entry.key))
          });
        break;
    }
  });
  return all
}

function saveEntry(type, userId, entry){
  var entriesRef = firebase.database().ref(type + 'Entries')
  switch (type) {
    case 'money':
       key = entriesRef.push({
        uid:  userId,
        name:  entry.name,
        amount:  entry.amount,
        category:  entry.category,
        subcategory:  entry.subcategory,
        comment:  entry.comment,
        date: entry.date
      }).key
      firebase.database().ref('users/' + userId).child(type + 'Entries').update({
        [key]: true
      })
      break;
    case 'time':
       key = entriesRef.push({
        uid: userId,
        start: entry.start,
        end: entry.end,
        category: entry.category
      }).key
      firebase.database().ref('users/' + userId).child(type + 'Entries').update({
        [key]: true
      })
      break;
  }
  fetchEntries(userId)
}

function getEntry(type, entryId){
  var attributes = []
  switch (type) {
    case 'money':
      firebase.database().ref('timeEntries/' + entryId).once('value', function(entry) {
         attributes.push(entry.val().name, entry.val().amount, entry.val().category, entry.val().subcategory, entry.val().comment, entry.val().date, entry.key)
      })
      break;
    case 'time':
      firebase.database().ref('timeEntries/' + entryId).once('value', function(entry) {
         attributes.push(entry.val().start, entry.val().end, entry.val().type, entry.key)
      })
      break;
  }
  var obj =  new Entry(attributes[0], attributes[1], attributes[2], attributes[3])
  return obj
}

function createMoneyEntry(e) {

  var userId      = firebase.auth().currentUser.uid
  var name        = document.getElementById('moneyEntryName').value
  var amount      = document.getElementById('moneyEntryAmount').value
  var category    = document.getElementById('moneyEntryCategory').value
  var subcategory = document.getElementById('moneyEntrySubCategory').value
  var comment     = document.getElementById('moneyEntryComment').value
  var eid         = ''
  var day         = document.getElementById('timeEntryDay').value
  var month       = document.getElementById('timeEntryMonth').value
  var year        = document.getElementById('timeEntryYear').value

  var date  = convertToDate('0700', day, month, year).format('X')
  var entry = new MoneyEntry(name, amount, category, subcategory, comment, date, eid)

  saveEntry('money', userId, entry);

  e.preventDefault();
  resetInputForms();
}

function createTimeEntry(e) {

  var userId      = firebase.auth().currentUser.uid
  var start_time = document.getElementById('timeEntryStart').value
  var end_time   = document.getElementById('timeEntryEnd').value
  var category   = document.getElementById('timeEntryCategory').value
  var day        = document.getElementById('timeEntryDay').value
  var month      = document.getElementById('timeEntryMonth').value
  var year       = document.getElementById('timeEntryYear').value
  var eid        = ''

  var entryStart = convertToDate(start_time, day, month, year).format('X');
  var entryEnd   = convertToDate(end_time, day, month, year).format('X');

  var entry = new TimeEntry(entryStart, entryEnd, category, eid)

  saveEntry('time', userId, entry)

  e.preventDefault();
  resetInputForms();
  focusTimeStart();
}

function updateEntry(entry){
  var entries = allEntries()
	for(var i = 0; i < entries.length; i++) {
		if (entries[i].id == entry.id) {
			break
		}
	}
  entries[i] = entry
  localStorage.setItem('entries', JSON.stringify(entries));
}

function deleteEntry(entryId){
  var entries = allEntries()
  for(var i = 0; i < entries.length; i++) {
    if (entries[i].id == entryId) {
      entries.splice(i, 1);
    }
  }
  localStorage.setItem('entries', JSON.stringify(entries));
  deleteEntryBar(entryId)
}

function newEntryId(){
  var entries = allEntries()
  var maxId = entries.reduce(function(currentMax, currentValue) {
    return Math.max(currentMax, currentValue.id)
  }, 0)
  return maxId + 1
}

function changeType(entryId){
  entry = getEntry(entryId)
  entry.type = getNextPossibleType(entry)
  recolorEntryBar(entry)
	updateEntry(entry)
}

function calculateDuration(entry){
  return moment.duration(moment(entry.end).diff(moment(entry.start))).as('minutes') + ' minutes'
}

function getNextPossibleType(entry){
  i = POSSIBLE_TYPES.indexOf(parseInt(entry.type))
  newType = POSSIBLE_TYPES[(i + 1 + POSSIBLE_TYPES.length) % POSSIBLE_TYPES.length]
  return newType
}

function getPossibleTypesOfEntries(){
  types = []
  allEntries().forEach(function(e){
    types.push(parseInt(e.type))
  })
  possibleTypes = [...new Set(types)].sort()
  return possibleTypes
}

function clearDatabase(){
  if (confirm("are you sure?")) {
    localStorage.setItem('entries', "");
  }
  fetchEntries()
}

// takes form parameters as strings and returns a date format. Is called by createEntry().
function convertToDate(eHourMinute, eDay, eMonth, eYear) {
	t = moment()
	minutes   = eHourMinute.substring(2,4)
	hours     = eHourMinute.substring(0,2)
	day       = eDay   || t.format('DD')
	month     = eMonth || t.format('MM')
	year      = eYear  || t.format('Y')
	entryDate = moment(`${year}-${month}-${day}T${hours}:${minutes}:00`)
	return entryDate
}
