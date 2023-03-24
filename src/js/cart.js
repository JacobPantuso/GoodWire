let carts = document.querySelectorAll('.fas fa-cart-plus'); 

for (let i = 0; i < carts.length; i++) {
   carts[i].addEventListener('click', () => {
    console.log("add to cart"); 
   })
}