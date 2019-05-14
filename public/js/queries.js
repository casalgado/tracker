function allEntries(type, uid){
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

function getEntry(eid){
    return new Promise((resolve, reject) => {
      firebase.database().ref('timeEntries').child(eid).once('value')
        .then(function(snapshot) {
           if(snapshot.val()) {
             resolve(instantiateEntry('time', includeKey(snapshot)))
           }
           else {
      firebase.database().ref('moneyEntries').child(eid).once('value')
          .then(function(snapshot) {
            resolve(instantiateEntry('money', includeKey(snapshot)))
          })}
        })
    })
}

function getEntryWithType(type, eid){
  return new Promise((resolve, reject) => {
    firebase.database().ref(type + 'Entries').child(eid).once('value')
      .then(function(snapshot){
        resolve(instantiateEntry(type, includeKey(snapshot)))
      })
  })
}

function todaysEntries(type, uid) {
  return new Promise(resolve => {
    var today = []
    firebase.database().ref(type + 'Entries').orderByChild("uid").equalTo(uid).once("value").then(function(snapshot) {
        snapshot.forEach(function(entry) {
          if (moment(entry.val().date, 'X').isSame(moment(), 'day')) {
            today.push(instantiateEntry(type, includeKey(entry)))
          }
        });
      resolve(today)
    });
  })
}
