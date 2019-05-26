Entry.fetchAllByType = function(type, uid){
  return new Promise(resolve => {
    var all = []
    firebase.database().ref(`users/${uid}/${type}Entries`).once("value").then(function(snapshot) {
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
          
        });
      resolve(all)
    });
  })
}
