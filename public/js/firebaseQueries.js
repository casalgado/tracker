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
