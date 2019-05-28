
MoneyEntry.show = function(period, timestamp){
  // period values correspond to 'day', 'week', 'month' or 'year'
  SHOWING.period = period // sets active period
  getEntries = MoneyEntry.getByPeriod(period, timestamp)
  MoneyEntry.draw(getEntries)
}

MoneyEntry.draw = function(entries){
  period = SHOWING.period
  moneyTable = document.getElementById('moneyTable')
  moneyTable.innerHTML = ""
  moneyTable.appendChild(drawTableHeader())
  switch (period) {
    case 'day':
        MoneyEntry.drawEachItem(entries)
      break;
    case 'week':
        MoneyEntry.drawEachCategory(entries)
      break;
    default:
      MoneyEntry.drawEachCategory(entries)
  }
}

MoneyEntry.drawEachItem = function(entries){
  document.getElementById('moneyTableHeaderCol1').innerHTML = 'Item'
  document.getElementById('moneyTableTitle').innerHTML = SHOWING.current.format('dddd MMMM D')
  for (var i = 0; i < entries.length; i++) {
    [row, cell1, cell2] = createTableElements('td')
    cell1.innerHTML = entries[i]['name']
    cell2.innerHTML = '$ ' + entries[i]['amount']
    row.appendChild(cell1)
    row.appendChild(cell2)
    document.getElementById('moneyTable').appendChild(row)
  }
  [row, cell1, cell2] = createTableElements('td')
  cell1.innerHTML = 'Total:'
  cell2.innerHTML = '$ ' + calculateTotal(entries)
  row.appendChild(cell1)
  row.appendChild(cell2)
  document.getElementById('moneyTable').appendChild(row)
}

MoneyEntry.drawEachCategory = function(entries){
  var categories = isolateProperty('category', entries)
  var totals = totalsPerKey(categories, entries)
  var period  = SHOWING.period
  var current = moment(SHOWING.current.format('X'), 'X')
  document.getElementById('moneyTableHeaderCol1').innerHTML = 'Category'
  document.getElementById('moneyTableTitle').innerHTML = `${current.startOf(period).format('D MMMM')} - ${current.endOf(period).format('D MMMM')}`
  for (var i = 0; i < categories.length; i++) {
    [row, cell1, cell2] = createTableElements('td')
    cell1.innerHTML = categories[i]
    cell2.innerHTML = '$ ' + totals[i]
    row.appendChild(cell1)
    row.appendChild(cell2)
    document.getElementById('moneyTable').appendChild(row)
  }
  [row, cell1, cell2] = createTableElements('td')
  cell1.innerHTML = 'Total:'
  cell2.innerHTML = '$ ' + totals.reduce((sum, total) => {return sum += total }, 0)
  row.appendChild(cell1)
  row.appendChild(cell2)
  document.getElementById('moneyTable').appendChild(row)
}

function drawTableHeader(){
  [row, cell1, cell2] = createTableElements('th')
  cell1.setAttribute('id', 'moneyTableHeaderCol1')
  cell1.innerHTML = 'Item'
  cell2.innerHTML = 'Price'
  row.appendChild(cell1)
  row.appendChild(cell2)
  return row
}

function totalsPerKey(array, entries){
  var totals = []
  for (var i = 0; i < array.length; i++) {
      inCategory = entries.filter((entry) => {
        return entry.category === array[i]
      })
      var totalAmount = calculateTotal(inCategory)
      totals.push(totalAmount)
  }
  return totals
}

function calculateTotal(entries){
  var total = entries.reduce((accumulator, entry) => {
    return accumulator += (parseFloat(entry.amount))
  }, 0)
  return parseInt(total*100)/100
}

function isolateProperty(prop, entries){
  // returns array of values of selected prop for array of entries
  onlyProps = []
  for (var i = 0; i < entries.length; i++) {
    onlyProps.push(entries[i][prop])
  }
  var uniqueProps = onlyProps.filter(function(element, pos) {
    return onlyProps.indexOf(element) === pos;
  })
  return uniqueProps
}

function createTableElements(cellType){
  var row = document.createElement('tr')
  var cell1 = document.createElement(cellType)
  var cell2 = document.createElement(cellType)
  return [row, cell1, cell2]
}

function showNext(){
  SHOWING.current.add(1, SHOWING.period)
  MoneyEntry.show(SHOWING.period, SHOWING.current.unix())
}

function showPrevious(){
  SHOWING.current.subtract(1, SHOWING.period)
  MoneyEntry.show(SHOWING.period, SHOWING.current.unix())
}
