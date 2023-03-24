function onModifyCart() {
    cartNumbers(); 

}

let carts = document.querySelectorAll('.addtocart'); 

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', onModifyCart); 
}

function cartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers'); 
    
    localStorage.setItem('cartNumbers', 1); 

}