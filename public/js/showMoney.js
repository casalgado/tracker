
MoneyEntry.show = function(period, timestamp){
  // period values correspond to 'day', 'week', 'month' or 'year'
  SHOWING.period = period // sets active period
  getEntries = MoneyEntry.getByPeriod(period, timestamp)
  MoneyEntry.draw(getEntries)
}

MoneyEntry.draw = function(entries){
  // get current period and clone of current day
  let period = SHOWING.period
  let current = moment(SHOWING.current.format('X'), 'X')
  // get table from DOM and set necessary variables
  let moneyTable = document.getElementById('moneyTable')
  let tableTitle, col1Header, col1List, col2List
  // reset table
  moneyTable.innerHTML = ""
  // create table header
  moneyTable.appendChild(drawTableHeader())
  // set variables depending on period
  if (period === 'day') {
    tableTitle = SHOWING.current.format('dddd MMMM D')
    col1Header = 'Item'
    col1List   = entries.map(e => e['name'])
    col2List   = entries.map(e => parseFloat(e['amount']))
  } else {
    tableTitle = `${current.startOf(period).format('D MMMM')} - ${current.endOf(period).format('D MMMM')}`
    col1Header = 'Category'
    col1List   = propList('category', entries)
    col2List   = totalsPer(col1List, entries)
  }
  // apply table title and headers from variables
  document.getElementById('moneyTableHeaderCol1').innerHTML = col1Header
  document.getElementById('moneyTableTitle').innerHTML = tableTitle
  // create table rows
  for (var i = 0; i < col1List.length; i++) {
    [row, cell1, cell2] = createTableElements('td')
    cell1.innerHTML = col1List[i]
    cell2.innerHTML = '$ ' + col2List[i]
    row.addEventListener("click", showPopover)
    row.style.textIndent = '0.2em'
    moneyTable.appendChild(row)
  }
  // add final 'Total:' row
  [row, cell1, cell2] = createTableElements('td')
  cell1.innerHTML = 'Total:'
  cell2.innerHTML = '$ ' + col2List.reduce((sum, total) => {return sum += total }, 0)
  moneyTable.appendChild(row)
}

function drawTableHeader(){
  [row, cell1, cell2] = createTableElements('th')
  cell1.setAttribute('id', 'moneyTableHeaderCol1')
  cell1.innerHTML = 'Item'
  cell2.innerHTML = 'Price'
  return row
}

function createTableElements2(cellType, c1, c2){
  let row = document.createElement('tr')
  let cell1 = document.createElement(cellType)
  let cell2 = document.createElement(cellType)
  cell1.innerHTML = c1
  cell1.innerHTML = c2
  row.appendChild(cell1)
  row.appendChild(cell2)
  return [row, cell1, cell2]
}

function createTableElements(cellType){
  let row = document.createElement('tr')
  let cell1 = document.createElement(cellType)
  let cell2 = document.createElement(cellType)
  row.appendChild(cell1)
  row.appendChild(cell2)
  return [row, cell1, cell2]
}

function totalsPer(keys, entries){
  // takes in array of keys and calculates total amount per key in entries array
  let totals = []
  for (var i = 0; i < keys.length; i++) {
      inCategory = entries.filter(e => {
        return e.category === keys[i]
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

function showNext(){
  SHOWING.current.add(1, SHOWING.period)
  MoneyEntry.show(SHOWING.period, SHOWING.current.unix())
}

function showPrevious(){
  SHOWING.current.subtract(1, SHOWING.period)
  MoneyEntry.show(SHOWING.period, SHOWING.current.unix())
}

Array.prototype.getUnique = function(){
  let uniq = [...new Set(this)];
  return uniq
}