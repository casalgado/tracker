class Entry {
    constructor(eid, uid){
      this.eid = eid
      this.uid = uid
    }
}

class TimeEntry extends Entry {
  constructor(eid, uid, type, start, end, category){
      super(eid, uid);
      this.type     = type;
      this.start    = start;
      this.end      = end;
      this.category = category;
  }
  duration(){
    return moment.duration(moment(this.end, 'X').diff(moment(this.start, 'X'))).as('minutes') + ' minutes'
  }
}

class MoneyEntry extends Entry {
  constructor(eid, uid, type, name, amount, category, subcategory, comment, date){
      super(eid, uid);
      this.type        = type;
      this.name        = name;
      this.amount      = amount;
      this.category    = category;
      this.subcategory = subcategory;
      this.comment     = comment;
      this.date        = date;
  }
}

function allEntries(type, uid){
  return new Promise(resolve => {
    firebase.database().ref(type + 'Entries').orderByChild("uid").equalTo(uid).once("value").then(function(snapshot) {
      switch (type) {
        case 'money':
            all = []
            snapshot.forEach(function(entry) {
              all.push(new MoneyEntry(entry.key, uid, entry.val().type, entry.val().name, entry.val().amount, entry.val().category, entry.val().subcategory, entry.val().comment, entry.val().date))
            });
          break;
        case 'time':
            all = []
            snapshot.forEach(function(entry) {
              all.push(new TimeEntry(entry.key, uid, entry.val().type, entry.val().start, entry.val().end, entry.val().category))
            });
          break;
      } return resolve(all)
    });
  })
}

function saveEntry(type, uid, entry){
  var entriesRef = firebase.database().ref(type + 'Entries')
    switch (type) {
      case 'money':
        new Promise(resolve => {
           var key = entriesRef.push({
             uid:  uid,
             type: entry.type,
             name:  entry.name,
             amount:  entry.amount,
             category:  entry.category,
             subcategory:  entry.subcategory,
             comment:  entry.comment,
             date: entry.date
           }).key
           return resolve(key)
        })
        .then(value => {
          firebase.database().ref('users/' + uid).child(type + 'Entries').update({
            [value]: true
          })
        })
        .then(() => {fetchEntries(uid)}) // this can be abstracted if saveEntry returns a promise
      break;
      case 'time':
        new Promise(resolve => {
           var key = entriesRef.push({
            uid: uid,
            type: entry.type,
            start: entry.start,
            end: entry.end,
            category: entry.category
          }).key
           return resolve(key)
        })
        .then(value => {
          firebase.database().ref('users/' + uid).child(type + 'Entries').update({
            [value]: true
          })
        })
        .then(() => {fetchEntries(uid)})
      break;
  }
}

function getEntry(type, entryId){ // work in progress
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

  var uid      = firebase.auth().currentUser.uid
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
  var entry = new MoneyEntry(eid, uid, 'money', name, amount, category, subcategory, comment, date)

  saveEntry('money', uid, entry);
  e.preventDefault();
  resetInputForms();
}

function createTimeEntry(e) {

  var uid        = firebase.auth().currentUser.uid
  var start_time = document.getElementById('timeEntryStart').value
  var end_time   = document.getElementById('timeEntryEnd').value
  var category   = document.getElementById('timeEntryCategory').value
  var day        = document.getElementById('timeEntryDay').value
  var month      = document.getElementById('timeEntryMonth').value
  var year       = document.getElementById('timeEntryYear').value
  var eid        = ''

  var entryStart = convertToDate(start_time, day, month, year).format('X');
  var entryEnd   = convertToDate(end_time, day, month, year).format('X');

  var entry = new TimeEntry(eid, uid, 'time', entryStart, entryEnd, category)

  saveEntry('time', uid, entry)

  e.preventDefault();
  resetInputForms();
  focusTimeStart();
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
