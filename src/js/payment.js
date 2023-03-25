export function processPayment() 
{
    setTimeout(() => {
        document.getElementById('title').innerHTML = 'Order Placed!';
        document.getElementById('desc').innerHTML = "Woohoo! You're all set, we'll redirect you now.";
    }
    , 3500);
    setTimeout(() => {
        window.location.href = 'payment-success.html'
    }
    , 4000);
}

export function validatePayment() {
    var name = document.getElementById('name').value;
    var card = document.getElementById('card').value;
    var cvv = document.getElementById('cvv').value;
    let currentDate = new Date();
    let expiryDate = document.getElementById("date").value;
    let expiryMonth = expiryDate.split('/')[0];
    let expiryYear = expiryDate.split('/')[1];
    let expiryDateObj = new Date(`20${expiryYear}`, expiryMonth - 1, 1);
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i ++) {
        inputs[i].style.borderColor = 'black';
    }
    if (sessionStorage.getItem('guest') == 'false') {
        if (name == '' || card.length != 16 || cvv.length != 3 || expiryDateObj < currentDate) {
            if (name == '') {
                document.getElementById('name').style.borderColor = 'red';
            } 
            if (card.length != 16 && /^\d+$/.test(card)) {
                document.getElementById('card').style.borderColor = 'red';
            }
            if (cvv.length != 3) {
                document.getElementById('cvv').style.borderColor = 'red';
            } 
            if (expiryDateObj < currentDate || expiryDate == '') {
                document.getElementById('date').style.borderColor = 'red';
            }
        } else {
            return true;
        }
    } else {
        var streetName = document.getElementById('street-name').value;
        var streetNumber = document.getElementById('street-num').value;
        var city = document.getElementById('city').value;
        var postal = document.getElementById('postal').value;
        var province = document.getElementById('province').value;
        if (name == '' || card.length != 16 || cvv.length != 3 || expiryDateObj < currentDate || streetName == '' || streetNumber == '' || city == '' || postal == '' || province == '') {
            if (name == '') {
                document.getElementById('name').style.borderColor = 'red';
            } 
            if (card.length != 16 || !(/^\d+$/.test(card))) {
                document.getElementById('card').style.borderColor = 'red';
            }
            if (cvv.length != 3) {
                document.getElementById('cvv').style.borderColor = 'red';
            } 
            if (expiryDateObj < currentDate || expiryDate == '') {
                document.getElementById('date').style.borderColor = 'red';
            }
            if (streetName == '') {
                document.getElementById('street-name').style.borderColor = 'red';
            }
            if (streetNumber == '') {
                document.getElementById('street-num').style.borderColor = 'red';
            }
            if (city == '') {
                document.getElementById('city').style.borderColor = 'red';
            }
            if (postal == '') {
                document.getElementById('postal').style.borderColor = 'red';
            }
            if (province == '') {
                document.getElementById('province').style.borderColor = 'red';
            }
        } else {
            return true;
        }
    }
}

if (sessionStorage.getItem('guest') == 'true' && window.location.href.split('/').pop() == 'payment.html') {
document.getElementById('loggedIn').style.display = 'none';
    document.getElementById('shipping-info').style.display = 'flex';
}