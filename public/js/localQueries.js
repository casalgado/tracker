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
  let entries
  if (!arguments[1]){
    entries = [...MONEY_ENTRIES]
  } else {
    // update RECENT.filter with arguments
    for (let i = 1; i < arguments.length; i++) {
      Object.assign(RECENT.filter, arguments[i])
      entries = getByPropertyValues(RECENT.filter)
    }
  }
	let recent = []
	for (var i = entries.length - 1; i >= 0; i--) {
		const element = entries[i].name
		if (recent.length < num) {
			recent.push(element)
			recent = recent.getUnique()
		}
	}
	return recent
}

function getByPropertyValues(obj){
  // takes in object of the form {prop: value, prop: value} and returns only entries that 
  // corespond to them. If obj = {category: alimentacion, subcategory: desayuno}, returns
  // only entries that fit both values. Returns most recent first. 
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