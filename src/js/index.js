import * as account from './account.js';

function openDropdown(element) {
    document.getElementById(element).classList.toggle("show");
    var caret = document.getElementById(element + "-caret");
    if (caret.classList.contains('fa-caret-down')) {
        caret.classList.remove('fa-caret-down');
        caret.classList.add('fa-caret-left');
    } else {
        caret.classList.remove('fa-caret-left');
        caret.classList.add('fa-caret-down');
    }
    var products = document.getElementById("products");
    if (products.classList.contains('show') && element != "products") {
        products.classList.remove('show');
    }
    var services = document.getElementById("services");
    if (services.classList.contains('show') && element != "services") {
        services.classList.remove('show');
    }
    var support = document.getElementById("support");
    if (support.classList.contains('show') && element != "support") {
        support.classList.remove('show');
    }
  }
  
  window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
        var products = document.getElementById("products");
        var productsCaret = document.getElementById("products-caret");
        if (products.classList.contains('show')) {
            products.classList.remove('show');
            productsCaret.classList.remove('fa-caret-left');
            productsCaret.classList.add('fa-caret-down');
        }
        var services = document.getElementById("services");
        var servicesCaret = document.getElementById("services-caret");
        if (services.classList.contains('show')) {
            services.classList.remove('show');
            servicesCaret.classList.remove('fa-caret-left');
            servicesCaret.classList.add('fa-caret-down');
        }
        var support = document.getElementById("support");
        var supportCaret = document.getElementById("support-caret");
        if (support.classList.contains('show')) {
            support.classList.remove('show');
            supportCaret.classList.remove('fa-caret-left');
            supportCaret.classList.add('fa-caret-down');
        }
    }
  }


window.onload = function() {
    account.receiveStorage();
    if (window.location.href.includes('account.html')) {
        if (sessionStorage.getItem('name') == null) {
            window.location.href = 'login.html';
        } else {
            document.getElementById("username").innerHTML = account.getAccountByName(sessionStorage.getItem('name')).name;
            var res = account.getAccountByName(sessionStorage.getItem('name'));
            document.getElementById('points').innerHTML = account.getAccountByName(sessionStorage.getItem('name')).points + " points";
        }
    }
    if (window.location.href.includes("login.html")) {
        if (sessionStorage.getItem('name') != null) {
            window.location.href = 'account.html';
        }
    }
    if (sessionStorage.getItem('name') != null) {
        document.getElementById('account').innerHTML = sessionStorage.getItem('name');
        document.getElementById('region').innerHTML = "Logout";
        document.getElementById('region').addEventListener('click', function() {
            sessionStorage.removeItem('name');
            window.location.href = 'login.html';
        });
    }

    if (window.location.href.includes("order-history.html")) {
        document.getElementById('order-history-description').innerHTML = "Hey " + sessionStorage.getItem('name') + ", here are your recent orders."
        var res = account.getAccountByName(sessionStorage.getItem('name'));
        var numOfOrders = res.getOrders().length;
        var numOfOrdersHTML = document.getElementById('num-of-orders')
        if (numOfOrders == 0) {
            numOfOrdersHTML.innerHTML = "There are no orders to display"
        } else if (numOfOrders == 1) {
            numOfOrdersHTML.innerHTML = "There is one order to display"
        } else {
            numOfOrdersHTML.innerHTML = "There are " + numOfOrders + " to display"
        }
        if (res.getOrders().length != 0) {
            var orders = res.getOrders()
            for (var i = 0; i < orders.length; i ++) {

            }
        } else {
            //document.getElementById('orders').innerHTML = "<p>There are no orders to display</p>";
        }
    }
}

window.onbeforeunload = function() {
    account.updateStorage();
}

/* Navigation Event Listeners */
document.getElementById('products-btn').addEventListener('click', function() {
    openDropdown('products');
});
document.getElementById('services-btn').addEventListener('click', function() {
    openDropdown('services');
});
document.getElementById('support-btn').addEventListener('click', function() {
    openDropdown('support');
});

/* Account Event Listeners */
if (window.location.href.includes("login.html")) {
    document.getElementById('sign-in').addEventListener('click', function() {
        account.login();
    });
}

if (window.location.href.includes("register.html")) {
    document.getElementById('register').addEventListener('click', function() {
        account.validateRegister();
    });
}

if (window.location.href.includes("forgot-password.html")) {
    document.getElementById('authenticate').addEventListener('click', function() {
        account.isAuth(localStorage.getItem('auth-code'));
    });
    document.getElementById('reset-password').addEventListener('click', function() {
        account.resetPassword(document.getElementById('email').value);
    });
}

if (window.location.href.includes("account.html")) {
    document.getElementById('order-history').addEventListener('click', function() {
        window.location.href = "order-history.html";
    });
    document.getElementById('payment-info').addEventListener('click', function() {
        window.location.href = "payment-information.html";
    });
    document.getElementById('personal-info').addEventListener('click', function() {
        window.location.href = "personal-information.html";
    });
}