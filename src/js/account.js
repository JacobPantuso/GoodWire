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
        storeObject(first_name + ' ' + last_name, email, password, phone);
        window.location.href = 'account.html';
    }
}

function login() {
    
}