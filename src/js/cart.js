export function cartNumbers(product) {

    console.log(product);
    
    let productNumbers = localStorage.getItem('cartNumbers'); 
    productNumbers = parseInt(productNumbers); 

    if (productNumbers) { // if there was already some products in the localStorage
        localStorage.setItem('cartNumbers', productNumbers + 1); 
        document.querySelector('.cart span').textContent = productNumbers + 1; 
    }

    else {
        localStorage.setItem('cartNumbers', 1); 
        document.querySelector('.cart span').textContent = 1; 
    }

    setItems(product)

}

export function RemoveFromCart(product) {

    let productNumbers = localStorage.getItem('cartNumbers'); 
    productNumbers = parseInt(productNumbers); 

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers - 1); 
        document.querySelector('.cart span').textContent = productNumbers - 1; 
    }
    else {
        localStorage.setItem('cartNumbers', 1); 
        document.querySelector('.cart span').textContent = 1; 
    }
    removeItems(product);


}

function setItems(product) {

   let cartItems = localStorage.getItem('productsInCart'); 
   cartItems = JSON.parse(cartItems); 
   
   if (cartItems != null) { // there is already something in the localStorage

      if (cartItems[product.name] == undefined) {
        cartItems = {
            ...cartItems,
            [product.name]: product
        }
      }
      cartItems[product.name].inCart += 1; 
   } 
   else {

     product.inCart = 1; 
     cartItems = {
        [product.name]: product
     }
   }

   localStorage.setItem("productsInCart", JSON.stringify(cartItems)); 

}

function removeItems(product) {

    let cartItems = localStorage.getItem('productsInCart'); 
    cartItems = JSON.parse(cartItems); 
    
    if (cartItems != null) { // there is already something in the localStorage
 
       if (cartItems[product.name] == undefined) {
         cartItems = {
             ...cartItems,
             [product.name]: product
         }
       }
       cartItems[product.name].inCart -= 1; 
    } 

    localStorage.setItem("productsInCart", JSON.stringify(cartItems)); 
 
 }

function displayCart() {

    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".cart-products");
    
    
    if ( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => { 
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle-outline"></ion-icon>
                <img src="src/img/${item.imagePath}">
                <span>${item.name}</span>
            </div>
            `
        });
    }

}


function onLoadCartNumbers() { // each time we refresh the page, we get the product number in the cart 
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers; 
    }
}

 export function totalCost(product) {

    let cartCost = localStorage.getItem('totalCost'); 
    
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
       localStorage.setItem("totalCost", cartCost + product.price); 
    }
    else {
        localStorage.setItem("totalCost", product.price); 
    }

 } 


onLoadCartNumbers();
displayCart();
