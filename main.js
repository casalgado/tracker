
function fetchEntries () {

  var entries = JSON.parse(localStorage.getItem('entries')) || []
  var entryList = document.getElementById('entryList');
  
  entryList.innerHTML = '';
  
  for (var i = 0; i < entries.length; i++) {
    var id = entries[i].id;
    var start = entries[i].start;
    var end = entries[i].end;
    
    entryList.innerHTML +=   '<div class="well">'+
                              '<h6>Issue ID: ' + id + '</h6>'+
                              '<p><span class="label label-info">' + status + '</span></p>'+
                              '<h3>' + start + '</h3>'+
                              '<h3>' + end + '</h3>'+
                              '</div>';
  }
}

document.getElementById('entryInputForm').addEventListener('submit', saveEntry);

function saveEntry(e) {
  if (localStorage.getItem('entries') === null) {
    var entryId = 1;
  } else {
    var entryId = JSON.parse(localStorage.getItem('entries')).length + 1
  }
  var entryStart = convertToDate(document.getElementById('entryStart').value);
  var entryEnd = convertToDate(document.getElementById('entryEnd').value);

  var entry = {
    id: entryId,
    start: entryStart,
    end: entryEnd,
  }
  
  if (localStorage.getItem('entries') === null) {
    var entries = [];
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
  } else {
    var entries = JSON.parse(localStorage.getItem('entries'));
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
  }
  
  document.getElementById('entryInputForm').reset();

 
  fetchEntries();
  focusStart()
  e.preventDefault();

}

function convertToDate(num) {
	d = new Date()
	entryDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), parseInt(num.substring(0,2))-5, parseInt(num.substring(2,4)))
	return entryDate
}

var moveFocus = function moveFocus(num) {
  if (num.length === 4) {
    focusEnd()
  }
}

function focusEnd() {
  document.getElementById('entryEnd').focus()
}

function focusStart() {
  document.getElementById('entryStart').focus()
}
