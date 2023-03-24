import * as account from './account.js';
import * as products from './product.js';

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
    var prodArray = products.initiateProducts();
    if (window.location.href.includes('contact.html')) {
        document.getElementById('contact-submit').addEventListener('click', function() {
            if (document.getElementById('fname').value == '') {
                document.getElementById('fname').style.border = "1px solid red";
            }
            if (document.getElementById('lname').value == '') {
                document.getElementById('lname').style.border = "1px solid red";
            }
            if (document.getElementById('email').value == '' || !document.getElementById('email').value.includes('@') || !document.getElementById('email').value.includes('.')) {
                document.getElementById('email').style.border = "1px solid red";
            }
            if (document.getElementById('subject').value == '') {
                document.getElementById('subject').style.border = "1px solid red";
            }
            if (document.getElementById('fname').value != '' && document.getElementById('lname').value != '' && (document.getElementById('email').value != '' || document.getElementById('email').value.includes('@') || document.getElementById('email').value.includes('.')) && document.getElementById('subject').value != '') {
                document.getElementById('contact-form').style.display = "none";
                document.getElementById('success-submit').style.display = "flex";
            }
        });
    }

    if (window.location.href.includes('products.html')) {
        products.loadProducts();
        let nums = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        for (var i = 0; i < prodArray.length; i ++) {
            document.getElementById('prod'+(i+1)).addEventListener('click', (function(i) {
                return function () {
                    var prodButton = document.getElementById('prod'+(i+1));
                    

                    // When you click Add to cart, the else statement will run

                    if (nums[i] %2 === 0){
                        prodButton.innerHTML = "Add to cart"
                        prodButton.style.backgroundColor = "";
                        nums[i]--;
                        
                    }
                      else{
                        prodButton.innerHTML = "Added"
                        prodButton.style.backgroundColor = "#7FFF00";
                        nums[i]++;
                        
                      }
                      
                };
            }(i)));
        }
    }

    if (window.location.href.includes('account.html')) {
        if (sessionStorage.getItem('name') == null) {
            window.location.href = 'login.html';
        } else {
            var res = account.getAccountByName(sessionStorage.getItem('name'));
            document.getElementById("username").innerHTML = account.getAccountByName(sessionStorage.getItem('name')).name;
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

    if (window.location.href.includes('personal-information.html')) {
        var res = account.getAccountByName(sessionStorage.getItem('name'));
        document.getElementById('name-change-selection').addEventListener('click', function() {
            document.getElementById('name-change').style.display = "flex";
            document.getElementById('changing').innerHTML = "Name Change";
            document.getElementById('change-options').style.display = "none";
        });
        document.getElementById('name-change-submit').addEventListener('click', function() {
            if (document.getElementById('first-name').value == '') {
                document.getElementById('first-name').style.border = "1px solid red";
            } 
            if (document.getElementById('last-name').value == '') {
                document.getElementById('last-name').style.border = "1px solid red";
            }
            var newName = document.getElementById('first-name').value + " " + document.getElementById('last-name').value;
            sessionStorage.setItem('name', newName);
            res.setName(newName);
            document.getElementById('name-change').style.display = "none";
            document.getElementById('change-options').style.display = "flex";
        });
        document.getElementById('email-change-selection').addEventListener('click', function() {
            document.getElementById('email-change').style.display = "flex";
            document.getElementById('changing').innerHTML = "Email Change";
            document.getElementById('change-options').style.display = "none";
        });
        document.getElementById('email-change-submit').addEventListener('click', function() {
            if (document.getElementById('email').value == '' || !document.getElementById('email').value.includes('@') || !document.getElementById('email').value.includes('.')) {
                document.getElementById('email').style.border = "1px solid red";
            } else {
                res.setEmail(document.getElementById('email').value);
                document.getElementById('email-change').style.display = "none";
                document.getElementById('change-options').style.display = "flex";
            }
        });
        document.getElementById('phone-change-selection').addEventListener('click', function() {
            document.getElementById('phone-change').style.display = "flex";
            document.getElementById('changing').innerHTML = "Phone Number Change";
            document.getElementById('change-options').style.display = "none";
        });
        document.getElementById('phone-change-submit').addEventListener('click', function() {
            if (document.getElementById('phone').value == '' || document.getElementById('phone').value.length != 10) {
                document.getElementById('phone').style.border = "1px solid red";
            } else {
                res.setPhone(document.getElementById('phone').value);
                document.getElementById('phone-change').style.display = "none";
                document.getElementById('change-options').style.display = "flex";
            }
        });
        document.getElementById('shipping-change-selection').addEventListener('click', function() {
            document.getElementById('shipping-change').style.display = "flex";
            document.getElementById('changing').innerHTML = "Address Change";
            document.getElementById('change-options').style.display = "none";
        });
        document.getElementById('shipping-change-submit').addEventListener('click', function() {
            if (document.getElementById('street-num').value == '') {
                document.getElementById('street-num').style.border = "1px solid red";
            }
            if (document.getElementById('street-name').value == '') {
                document.getElementById('street-name').style.border = "1px solid red";
            }
            if (document.getElementById('city').value == '') {
                document.getElementById('city').style.border = "1px solid red";
            }
            if (document.getElementById('province').value == '') {
                document.getElementById('province').style.border = "1px solid red";
            }
            if (document.getElementById('postal-code').value == '') {
                document.getElementById('postal-code').style.border = "1px solid red";
            }
            if (document.getElementById('country').value == '') {
                document.getElementById('country').style.border = "1px solid red";
            }
            res.changeAddress(document.getElementById('street-num').value, document.getElementById('street-name').value, document.getElementById('city').value, document.getElementById('province').value, document.getElementById('postal-code').value, document.getElementById('country').value);
            document.getElementById('shipping-change').style.display = "none";
            document.getElementById('change-options').style.display = "flex";
        });
        document.getElementById('name').innerHTML = "Full Name: " + res.name;
        document.getElementById('email').innerHTML = "Email Address: " + res.email;
        document.getElementById('phone').innerHTML = "Phone Number: " + res.phone.substring(0, 3) + '-' + res.phone.substring(3, 6) + '-' + res.phone.substring(6, 10);
        if (res.getAddress() == '') {
            document.getElementById('address').innerHTML = "Shipping Address: No address on file";
        } else {
            document.getElementById('address').innerHTML = "Shipping Address: " + res.getAddress();
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

if (window.location.href.includes("cart.html")) {
    document.getElementById('login-btn').addEventListener('click', function() {
        sessionStorage.setItem('guest', 'false');
        window.location.href = 'login.html';
    });
    document.getElementById('guest-btn').addEventListener('click', function() {
        sessionStorage.setItem('guest', 'true');
        window.location.href = 'payment.html';
    });
    document.getElementById('checkout-btn').addEventListener('click', function() {
        if (sessionStorage.getItem('name') == null) {
            document.getElementById('cc').style.display = 'none';
            document.getElementById('cag').style.display = 'flex';
        } else {
            window.location.href = 'payment.html';
        }
    });
}