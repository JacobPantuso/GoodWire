function myFunction(element) {
    document.getElementById(element).classList.toggle("show");
    // change the arrow to fa-solid fa-caret-up where the icon has id of element-caret
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
    var brands = document.getElementById("brands");
    if (brands.classList.contains('show') && element != "brands") {
        brands.classList.remove('show');
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
        var brands = document.getElementById("brands");
        var brandsCaret = document.getElementById("brands-caret");
        if (brands.classList.contains('show')) {
            brands.classList.remove('show');
            brandsCaret.classList.remove('fa-caret-left');
            brandsCaret.classList.add('fa-caret-down');
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
    // if the href includes account.html
    if (window.location.href.includes('account.html')) {
        if (sessionStorage.getItem('name') == null) {
            window.location.href = 'login.html';
        }
    }
    if (window.location.href.includes("login.html")) {
        if (sessionStorage.getItem('name') != null) {
            window.location.href = 'account.html';
        }
    }
    if (sessionStorage.getItem('name') != null) {
        document.getElementById('account').innerHTML = sessionStorage.getItem('name');
    }
}