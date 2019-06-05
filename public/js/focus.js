function moveFocus(num, limit, func) {
  if (num.length === limit) {
    func()
  }
}

function focusTimeEnd() {
  document.getElementById('timeEntryEnd').focus()
}

function focusTimeStart() {
  document.getElementById('moneyEntryTable').focus()
}

function focusTimeDay() {
  document.getElementById('timeEntryDay').focus()
}

function focusTimeMonth() {
  document.getElementById('timeEntryMonth').focus()
}

function focusTimeYear() {
  document.getElementById('timeEntryYear').focus()
}

function focusTimeCategory() {
	document.getElementById('timeEntryCategory').focus()
}
