
MoneyEntry.show = function(period, timestamp){
  // period values correspond to 'day', 'week', 'month' or 'year'
  SHOWING.period = period
  entries = MoneyEntry.getByPeriod(period, timestamp)
  MoneyEntry.draw(entries)
}

MoneyEntry.draw = function(entries){
  period = SHOWING.period
  moneyTable = document.getElementById('moneyTable')
  moneyTable.innerHTML = ""
  moneyTable.appendChild(drawTableHeader())
  switch (period) {
    case 'day':
        MoneyEntry.drawDay(entries)
      break;
    case 'week':
        MoneyEntry.drawWeek(entries)
      break;
    default:
      MoneyEntry.drawMonth(entries)
  }
}

MoneyEntry.drawDay = function(entries){
  period = SHOWING.period
  document.getElementById('moneyTableHeaderCol1').innerHTML = 'Item'
  document.getElementById('moneyTableTitle').innerHTML = SHOWING.current.format('dddd D')
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

MoneyEntry.drawMonth = function(entries){
  period = SHOWING.period
  var categories = isolateProperty('category', entries)
  var totals = totalsPerKey(categories, entries)
  document.getElementById('moneyTableHeaderCol1').innerHTML = 'Category'
  document.getElementById('moneyTableTitle').innerHTML = SHOWING.current.format('MMMM')
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
  cell2.innerHTML = '$ ' + totals.reduce((accumulator, item) => {return accumulator += item }, 0)
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
