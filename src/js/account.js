if (localStorage.getItem('accounts') === null) {
    accounts = []
    localStorage.setItem('accounts', JSON.stringify([]));
} else {
    accounts = JSON.parse(localStorage.getItem('accounts'));
}

class Account {
    constructor(name, email, password, phone) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.orders = [];
        this.street_number = 0;
        this.street_name = '';
        this.city = '';
        this.province = '';
        this.postal_code = '';
        this.country = '';
        if (accounts.find(account => account.email === email)) {
            accounts.splice(accounts.findIndex(account => account.email === email), 1);
            accounts.push(this);
        } else {
            accounts.push(this);
        }
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }

    getName() {
        return this.name;
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
    }

    changeAddress(street_number, street_name, city, province, postal_code, country) {
        this.street_number = street_number;
        this.street_name = street_name;
        this.city = city;
        this.province = province;
        this.postal_code = postal_code;
        this.country = country;
    }

    addOrder(order) {
        this.orders.push(order);
    }

}

function findAccount(email) {
    return accounts.find(account => account.email === email);
}

function validateRegister() {
    first_name = document.getElementById('first-name').value;
    last_name = document.getElementById('last-name').value;
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    phone = document.getElementById('phone').value;
    flag = 0;
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
        getAccount(email).then(function(doc) {
            if (doc.error) {
                storeAccount(first_name + ' ' + last_name, email, password, phone);
                window.location.href = 'login.html';
            } else {
                document.getElementById('description').innerHTML = 'An account with this email already exists.';
                document.getElementById('description').style.color = 'red';
            }
          });
    }
}

function login() {
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    getAccount(email).then(function(doc) {
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
                account = new Account(doc.name, doc._id, doc.password, doc.phone);
                window.location.href = 'account.html';
            }
        }
      }).catch(function(err) {
        console.error(err); // handle the error
      });
}

function isAuth(code, email) {
    console.log(email);
    user_code = document.getElementById('code').value;
    if (user_code == code) {
        document.getElementById('password').style.display = 'block';
        document.getElementById("code").style.display = "none";
        document.getElementById("email-label").innerHTML = "New Password";
        document.getElementById('description').style.color = 'black';
        document.getElementById('description').innerHTML = 'Create your new password below.';
        document.getElementsByClassName("btm-row")[0].innerHTML = "<button type='button' onclick='resetPassword(\"" + email + "\")'>Reset Password</button>";
    } else {
        document.getElementById('description').innerHTML = 'The code you entered is incorrect. Please try again.';
        document.getElementById('description').style.color = 'red';
    }
}

function resetPassword(email) {
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    getAccount(email).then(function(doc) {
        account = new Account(doc.name, doc._id, password, doc.phone);
        doc.password = password;
        updateAccount(doc);
    });
    window.location.href = 'login.html';
}