function allMoneyEntries(userId){
  // allEntries = []
  // entries = firebase.database().ref('moneyEntries')
  // entries.orderByChild("uid").equalTo(userId).on("value", function(snapshot) {
  //   snapshot.forEach(function(entry) {
  //     allEntries.push(new Entry(entry.key, entry.val().start, entry.val().end, entry.val().type))
  //   });
  // });
  return []
}

function saveMoneyEntry(timeEntry, userId){
  var entriesRef = firebase.database().ref('moneyEntries')
  const key = entriesRef.push({
    uid: userId,
    start: timeEntry.start,
    end: timeEntry.end,
    type: timeEntry.type
  }).key
  firebase.database().ref('users/' + userId).child('moneyEntries').update({
    [key]: true
  })
}

function getMoneyEntry(entryId){
  var attributes = []
  firebase.database().ref('moneyEntries/' + entryId).once('value', function(entry) {
     attributes.push(entry.key, entry.val().start, entry.val().end, entry.val().type)
  })
  var obj =  new Entry(attributes[0], attributes[1], attributes[2], attributes[3])
  return obj
}
