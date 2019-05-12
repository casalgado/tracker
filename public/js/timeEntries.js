function allTimeEntries(userId){
  allEntries = []
  dbEntries = firebase.database().ref('timeEntries')
  dbEntries.orderByChild("uid").equalTo(userId).on("value", function(entries) {
    entries.forEach(function(entry) {
      allEntries.push(new TimeEntry(entry.key, entry.val().start, entry.val().end, entry.val().type))
    });
  });
  return allEntries
}

function saveTimeEntry(timeEntry, userId){
  var entriesRef = firebase.database().ref('timeEntries')
  const key = entriesRef.push({
    uid: userId,
    start: timeEntry.start,
    end: timeEntry.end,
    type: timeEntry.type
  }).key
  firebase.database().ref('users/' + userId).child('timeEntries').update({
    [key]: true
  })
}

function getTimeEntry(entryId){
  var attributes = []
  firebase.database().ref('timeEntries/' + entryId).once('value', function(entry) {
     attributes.push(entry.key, entry.val().start, entry.val().end, entry.val().type)
  })
  var obj =  new Entry(attributes[0], attributes[1], attributes[2], attributes[3])
  return obj
}
