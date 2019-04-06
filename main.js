
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
  var entryId = 1;
  var entryStart = document.getElementById('entryStart').value;
  var entryEnd = document.getElementById('entryEnd').value;

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
  
  document.getElementById('issueInputForm').reset();
 
  fetchEntries();
  
  e.preventDefault();

}