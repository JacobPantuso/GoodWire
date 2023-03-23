var accounts = [];

class Account {
    constructor(name, email, password, phone, orders, cart, points, street_number, street_name, city, province, postal_code, country) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.orders = orders;
        this.cart = cart;
        this.points = points;
        this.street_number = street_number;
        this.street_name = street_name;
        this.city = city;
        this.province = province;
        this.postal_code = postal_code;
        this.country = country;
        accounts.push(this);
    }

    getName() {
        return this.name;
    }

    getPoints() {
        return this.points;
    }

    addPoints(points) {
        this.points += points;
        updateStorage();
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    getPhone() {
        return this.phone;
    }

    changePassword(newPassword) {
        this.password = newPassword;
        updateStorage();
    }

    changeAddress(street_number, street_name, city, province, postal_code, country) {
        this.street_number = street_number;
        this.street_name = street_name;
        this.city = city;
        this.province = province;
        this.postal_code = postal_code;
        this.country = country;
        updateStorage();
    }

    addOrder(order) {
        this.orders.push(order);
        updateStorage();
    }

    getOrders() {
        return this.orders;
    }

    removeOrder(order) {
        this.orders.splice(this.orders.indexOf(order), 1);
        updateStorage();
    }
}

export function updateStorage() {
    localStorage.setItem('accounts', JSON.stringify(accounts));
} 

export function receiveStorage() {
    var retrievedAccounts = JSON.parse(localStorage.getItem('accounts'));
    for (var i = 0; i < retrievedAccounts.length; i++) {
        new Account(retrievedAccounts[i].name, retrievedAccounts[i].email, retrievedAccounts[i].password, retrievedAccounts[i].phone, retrievedAccounts[i].orders, retrievedAccounts[i].cart, retrievedAccounts[i].points, retrievedAccounts[i].street_number, retrievedAccounts[i].street_name, retrievedAccounts[i].city, retrievedAccounts[i].province, retrievedAccounts[i].postal_code, retrievedAccounts[i].country);
    }
}

export function retrieveObject(email) {
    for (var i = 0; i < accounts.length; i++) {
        if (accounts[i].email == email) {
            return accounts[i];
        }
    }
}

export function getAccountByName(name) {
    for (var i = 0; i < accounts.length; i++) {
        if (accounts[i].name == name) {
            return accounts[i];
        }
    }
    return null;
}

export function validateRegister() {
    var first_name = document.getElementById('first-name').value;
    var last_name = document.getElementById('last-name').value;
    var full_name = first_name + ' ' + last_name;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var phone = document.getElementById('phone').value;
    var flag = 0;
    if (getAccountByName(full_name) != null) {
        document.getElementById('description').innerHTML = 'An account with this information already exists.';
        document.getElementById('description').style.color = 'red';
        return false;
    }
    if (first_name == '') {
        document.getElementById('first-name').style.borderColor = 'red';
    } else { flag++; }
    if (last_name == '') {
        document.getElementById('last-name').style.borderColor = 'red';
    } else { flag++; }
    if (email == '' || email.indexOf('@') == -1 || email.indexOf('.') == -1) {
        document.getElementById('email').style.borderColor = 'red';
    } else { flag++; }
    if (password == '' && password.length < 8 && password.match(/[A-Z]/) == null && password.match(/[a-z]/) == null && password.match(/[0-9]/) == null && password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) == null) {
        document.getElementById('password').style.borderColor = 'red';
    } else { flag++; }
    if (phone == '' || phone.length != 10) {
        document.getElementById('phone').style.borderColor = 'red';
    } else { flag++; }

    if (flag == 5) {
        new Account(first_name + ' ' + last_name, email, password, phone, [], [], 0, '', '', '', '', '', '');
        window.location.href = 'login.html';
        /*getAccount(email).then(function(doc) {
            if (doc.error) {
                storeAccount(first_name + ' ' + last_name, email, password, phone);
                window.location.href = 'login.html';
            } else {
                document.getElementById('description').innerHTML = 'An account with this email already exists.';
                document.getElementById('description').style.color = 'red';
            }
          });*/
    }
}

export function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    console.log(email); 
    if (accounts.find(account => account.email == email && account.password == password)) {
        sessionStorage.setItem('name', retrieveObject(email).getName());
        sessionStorage.setItem('guest', 'false');
        window.location.href = 'account.html';
    } else {
        document.getElementById('description').innerHTML = 'The credentials you entered are incorrect. Please try again.';
        document.getElementById('description').style.color = 'red';
    }
    /*getAccount(email).then(function(doc) {
        if (doc.error) {
            document.getElementById('description').innerHTML = 'The credentials you entered are incorrect. Please try again.';
        } else if (doc._id != email) {
            document.getElementById('description').innerHTML = 'The credentials you entered are incorrect. Please try again.';
            document.getElementById('description').style.color = 'red';
        } else {
            if (doc.password != password) {
                document.getElementById('description').innerHTML = 'The credentials you entered are incorrect. Please try again.';
                document.getElementById('description').style.color = 'red';
            } else {
                sessionStorage.setItem('name', doc.name);
                retrieveObject(email);
                window.location.href = 'account.html';
            }
        }
      }).catch(function(err) {
        console.error(err); // handle the error
      });*/
}

export function isAuth(code) {
    var user_code = document.getElementById('code').value;
    if (user_code == code) {
        document.getElementById('password').style.display = 'block';
        document.getElementById("code").style.display = "none";
        document.getElementById("email-label").innerHTML = "New Password";
        document.getElementById('description').style.color = 'black';
        document.getElementById('description').innerHTML = 'Create your new password below.';
        document.getElementById('authenticate').style.display = 'none';
        document.getElementById('reset-password').style.display = 'block';
        localStorage.removeItem('auth-code');
    } else {
        document.getElementById('description').innerHTML = 'The code you entered is incorrect. Please try again.';
        document.getElementById('description').style.color = 'red';
    }
}

export function resetPassword(email) {
    var password = document.getElementById('password').value;
    var account = retrieveObject(email);
    account.changePassword(password);
    window.location.href = 'login.html';
}

