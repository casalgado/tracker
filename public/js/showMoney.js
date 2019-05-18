
MoneyEntry.showByPeriod = function(period, timestamp){
  // period values correspond to 'day', 'month', or 'year'
  entries = MoneyEntry.getByPeriod(period, timestamp)
  MoneyEntry.drawByPeriod(period, entries)
}

MoneyEntry.drawByPeriod = function(period, entries){
  moneyTable = document.getElementById('moneyTable')
  moneyTable.innerHTML = ""
  moneyTable.appendChild(drawTableHeader())
  switch (period) {
    case 'day':
        MoneyEntry.drawDay(entries, period)
      break;
    default:
      MoneyEntry.drawMonth(entries, period)
  }
}

MoneyEntry.drawDay = function(entries, period){
  for (var i = 0; i < entries.length; i++) {
    [row, cell1, cell2] = createTableElements('td')
    cell1.innerHTML = entries[i]['name']
    cell2.innerHTML = '$ ' + entries[i]['amount']
    document.getElementById('moneyTableHeaderCol1').innerHTML = 'Item'
    document.getElementById('moneyTableTitle').innerHTML = ACTIVE_DAY.format('DD')
    row.appendChild(cell1)
    row.appendChild(cell2)
    document.getElementById('moneyTable').appendChild(row)
  }
}

MoneyEntry.drawMonth = function(entries, period){
  var categories = isolateProperty('category', entries)
  var totals = totalsPerValue(categories, entries)
  for (var i = 0; i < categories.length; i++) {
    [row, cell1, cell2] = createTableElements('td')
    cell1.innerHTML = categories[i]
    cell2.innerHTML = '$ ' + totals[i]
    document.getElementById('moneyTableHeaderCol1').innerHTML = 'Category'
    document.getElementById('moneyTableTitle').innerHTML = "This Month's Money"
    row.appendChild(cell1)
    row.appendChild(cell2)
    document.getElementById('moneyTable').appendChild(row)
  }
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

function totalsPerValue(array, entries){
  var totals = []
  for (var i = 0; i < array.length; i++) {
      inCategory = entries.filter((entry) => {
        return entry.category === array[i]
      })
      var totalAmount = inCategory.reduce((accumulator, entry) => {
        return accumulator += parseInt(entry.amount)
      }, 0)
      totals.push(totalAmount)
  }
  return totals
}

function isolateProperty(prop, entries){
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
