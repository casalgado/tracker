Entry.fetchAllByType = function(type, uid){
  return new Promise(resolve => {
    var all = []
    firebase.database().ref(type + 'Entries').orderByChild("uid").equalTo(uid).once("value").then(function(snapshot) {
        snapshot.forEach(function(entry) {
          all.push(instantiateEntry(type, includeKey(entry)))
        });
      resolve(all)
    });
  })
}

Entry.updateAll = function(type){
  return new Promise(resolve => {
    var all = []
    firebase.database().ref(type + 'Entries').once("value").then(function(snapshot) {
        snapshot.forEach(function(entry) {
          firebase.database().ref('moneyEntries').child(entry.key).update({name: entry.val().name.toLowerCase()})
          firebase.database().ref('moneyEntries').child(entry.key).update({comment: entry.val().comment.toLowerCase()})
        });
      resolve(all)
    });
  })
}
