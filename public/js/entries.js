class Entry {
    constructor(eid, uid){
      this.eid = eid
      this.uid = uid
    }

    saveEntry(){
      var key
      return new Promise(resolve => {
        key = firebase.database().ref(`users/${this.uid}/${this.type}Entries`).push(this).key
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
      this.type        = type; // can be refactored
      this.name        = name;
      this.amount      = amount;
      this.category    = category;
      this.subcategory = subcategory;
      this.comment     = comment;
      this.date        = date;
  }
}

function createEntry(form){ 
  let uid = firebase.auth().currentUser.uid
  let eid = ''
  let [name, category, subcategory, amount, comment] = getFormValues(form)
  let date  = SHOWING.current.format('X')
  let entry = new MoneyEntry(eid, uid, 'money', name, amount, category, subcategory, comment, date)
  entry.saveEntry().then(() => { MoneyEntry.show(SHOWING.period, SHOWING.current.unix())});
  resetInputForms();
}

function getFormValues(form){
  return Array.from(form.getElementsByTagName('input')).map(e => e.value.toLowerCase())
}

function instantiateEntry(type, dbObj){
  // called when retreiving objects from database
  var entry 
  var json = JSON.parse(JSON.stringify(dbObj))
  switch (type) {
    case 'money':
        entry = new MoneyEntry()
      break;
    case 'time':
        entry = new TimeEntry()
      break;
  }
  for (var i = 0; i < Object.keys(json).length; i++) {
    entry[Object.keys(json)[i]] = Object.values(json)[i]
  }
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
