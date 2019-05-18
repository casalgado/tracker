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
