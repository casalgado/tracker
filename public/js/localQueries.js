Entry.getByEid = function(eid){
  return MONEY_ENTRIES.find(obj => {return obj.eid === eid}) || TIME_ENTRIES.find(obj => {return obj.eid === eid})
}

MoneyEntry.getByPeriod = function(period, timestamp) {
  return getByPeriod(MONEY_ENTRIES, period, timestamp)
}

TimeEntry.getByPeriod = function(period, timestamp) {
  return getByPeriod(TIME_ENTRIES, period, timestamp)
}

function getByPeriod(entries, period, timestamp) {
  return entries.filter(entry => {
    return moment(entry.date, 'X').isSame(moment(timestamp, 'X'), period)
  })
}

function getRecent(num){
	let recent = []
	for (var i = MONEY_ENTRIES.length - 1; i >= 0; i--) {
		const element = MONEY_ENTRIES[i].name
		if (recent.length < num) {
			recent.push(element)
			recent = recent.getUnique()
		}
	}
	return recent
}

function getByPropertyValues(obj){
  let entries = [...MONEY_ENTRIES]
  let keys = Object.keys(obj)
  let values = Object.values(obj)
  for (var i = 0; i < keys.length; i++) {
    entries = entries.filter((e)=> {return e[keys[i]] == values[i]})      
  }
  return entries
}

function propList(prop, entries){
  // returns list of property values of entries array
  onlyProps = entries.map( e => e[prop]).getUnique()
  return onlyProps
}