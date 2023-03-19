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