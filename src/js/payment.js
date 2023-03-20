function processPayment() 
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

function validatePayment() {
    var name = document.getElementById('name').value;
    var card = document.getElementById('card').value;
    var cvv = document.getElementById('cvv').value;
    let currentDate = new Date();
    let expiryDate = document.getElementById("date").value;
    let expiryMonth = expiryDate.split('/')[0];
    let expiryYear = expiryDate.split('/')[1];
    let expiryDateObj = new Date(`20${expiryYear}`, expiryMonth - 1, 1);
    if (name == '' || card.length != 16 || cvv.length != 3 || expiryDateObj < currentDate) {
        if (name == '') {
            document.getElementById('name').style.borderColor = 'red';
        } 
        if (card.length != 16) {
            document.getElementById('card').style.borderColor = 'red';
        }
        if (cvv.length != 3) {
            document.getElementById('cvv').style.borderColor = 'red';
        } 
        if (expiryDateObj < currentDate || expiryDate == '') {
            document.getElementById('date').style.borderColor = 'red';
        }
    } else {
        window.location.href = 'process-payment.html';
    }
}