var PouchDB = require('pouchdb');

var db = new PouchDB('goodwire');

window.storeObject = function(name, email, password, phone) {
  db.put({
    _id: email,
    name: name,
    password: password,
    phone: phone,
    orders: [],
    street_number: 0,
    street_name: '',
    city: '',
    province: '',
    postal_code: '',
    country: ''
  }).then(function (response) {
    // handle response
  }).catch(function (err) {
    console.log(err);
  });
};

window.getObject = function(email) {
  db.get(email).then(function (doc) {
    console.log(doc);
  }).catch(function (err) {
    console.log(err);
  });
};

window.printDB = function() {
  db.allDocs({include_docs: true, descending: true}, function(err, doc) {
    console.log(doc.rows);
  });
}

