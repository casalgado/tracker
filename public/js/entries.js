class Entry {
    constructor(eid, uid){
      this.eid = eid
      this.uid = uid
    }

    saveEntry(){
      return new Promise(resolve => {
        var key = firebase.database().ref(`users/${this.uid}/${this.type}Entries`).push(this).key
        return resolve(key)
      })
      .then(value => {
        firebase.database().ref(`users/${this.uid}/${this.type}Entries`).child(value).update({
          eid: value
        })
        this.eid = value
        MONEY_ENTRIES.push(this)
      })
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

function createEntry(type){
  var uid = firebase.auth().currentUser.uid
  var entry
  switch (type) {
    case 'money':
        var eid         = ''
        var name        = document.getElementById('moneyEntryName').value.toLowerCase()
        var amount      = document.getElementById('moneyEntryAmount').value
        var category    = document.getElementById('moneyEntryCategory').value.toLowerCase()
        var subcategory = document.getElementById('moneyEntrySubCategory').value.toLowerCase()
        var comment     = document.getElementById('moneyEntryComment').value.toLowerCase()
        var day         = document.getElementById('timeEntryDay').value
        var month       = document.getElementById('timeEntryMonth').value
        var year        = document.getElementById('timeEntryYear').value
        var date  = convertToDate(moment().format('HHmm'), day, month, year).format('X')
        entry = new MoneyEntry(eid, uid, 'money', name, amount, category, subcategory, comment, date)
        entry.saveEntry().then(() => { MoneyEntry.show(SHOWING.period, SHOWING.current.unix())});
      break;
    case 'time':
        var eid        = ''
        var start_time = document.getElementById('timeEntryStart').value
        var end_time   = document.getElementById('timeEntryEnd').value
        var category   = document.getElementById('timeEntryCategory').value

        var day        = document.getElementById('timeEntryDay').value
        var month      = document.getElementById('timeEntryMonth').value
        var year       = document.getElementById('timeEntryYear').value

        var entryStart = convertToDate(start_time, day, month, year).format('X');
        var entryEnd   = convertToDate(end_time, day, month, year).format('X');

        var entry = new TimeEntry(eid, uid, 'time', entryStart, entryEnd, category)
        entry.saveEntry().then(() => { TimeEntry.showByPeriod('day', SHOWING.current.unix())});
      break;
  }
  resetInputForms();
  focusTimeStart();
}

function instantiateEntry(type, value){
  // called when retreiving objects from database
  var newEntry
  switch (type) {
    case 'money':
        newEntry = new MoneyEntry()
      break;
    case 'time':
        newEntry = new TimeEntry()
      break;
  }
  separated = separateObject(value)
  for (var i = 0; i < separated[0].length; i++) {
    newEntry[separated[0][i]] = separated[1][i]
  }
  return newEntry
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

function includeKey(object){
  // called to include "eid" key when retreiving objects from database
  entry = JSON.parse(JSON.stringify(object.val()))
  entry.eid = object.key
  return entry
}

function convertToDate(eHourMinute, eDay, eMonth, eYear) {
  // takes form parameters as strings and returns a date format. Is called by createEntry().
	t = moment()
	minutes   = eHourMinute.substring(2,4)
	hours     = eHourMinute.substring(0,2)
	day       = eDay   || t.format('DD')
	month     = eMonth || t.format('MM')
	year      = eYear  || t.format('Y')
	entryDate = moment(`${year}-${month}-${day}T${hours}:${minutes}:00`)
	return entryDate
}
