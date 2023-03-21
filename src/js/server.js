var PouchDB = require('pouchdb');

var accounts_db = new PouchDB('accounts');
var orders_db = new PouchDB('orders');
var products_db = new PouchDB('products');

window.storeAccount = function(name, email, password, phone) {
  accounts_db.put({
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
    return response;
  }).catch(function (err) {
    return err;
  });
};

window.updateAccount = function(doc) {
  accounts_db.put(doc).then(function (response) {
    return response;
  }).catch(function (err) {
    return err;
  });
}

window.getAccount = function(email) {
  return accounts_db.get(email).then(function (doc) {
    return doc;
  }).catch(function (err) {
    return err;
  });
};

window.printAccounts = function() {
  accounts_db.allDocs({include_docs: true, descending: true}, function(err, doc) {
    console.log(doc.rows);
  });
}

