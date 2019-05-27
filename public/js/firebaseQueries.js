var database = firebase.database()

Entry.fetchAllByType = function(type, uid){
  return new Promise(resolve => {
    var all = []
    firebase.database().ref(`users/${uid}/${type}Entries`).once("value").then(function(snapshot) {
        snapshot.forEach(function(entry) {
          all.push(instantiateEntry(type, entry.val()))
        });
      resolve(all)
    });
  })
}

Entry.updateAll = function(type, uid){
  return new Promise(resolve => {
    var all = []
    firebase.database().ref(`users/${uid}/${type}Entries`).once("value").then(function(snapshot) {
        snapshot.forEach(function(entry) {
          // 
        });
      resolve(all)
    });
  })
}
