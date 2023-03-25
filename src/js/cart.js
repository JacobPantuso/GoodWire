export function cartNumbers(product) {
    
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
 
       if (cartItems[product.name].inCart > 0) {
        
         cartItems[product.name].inCart -= 1; 
        }

        if (cartItems[product.name].inCart == 0) {
            delete cartItems[product.name]; 
            
        } 
    
        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    
    }

}

function displayCart() {

    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    if ( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => { 
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle"></ion-icon>
                <img src="src/img/${item.imagePath}">
                <span>${item.name}</span>
            </div>
            <div class="price">${item.price}</div>
            <div class="quantity">
                <ion-icon class="decrease" name="caret-back"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class="increase" name="caret-forward"></ion-icon>
            </div>
            `

            
        });
    }

}

function displayOrder() {

    let cartCost = localStorage.getItem("totalCost");
    cartCost = JSON.parse(cartCost);

    let cartRow = document.getElementById("subtotal"); 
    var discountVariable = 0; 
    if ( cartCost && cartRow ) {
       cartRow.innerHTML = "$" + cartCost.toFixed(2);
       var discounts = document.getElementById("discount"); 
       if (cartCost > 500) {
          discounts.innerHTML = "30%"; 
          discountVariable = 0.30; 
       }
       else {
        discounts.innerHTML = "$0.00";
       }

       let tax = document.getElementById("taxes"); 
       tax.innerHTML = "13%"
       let taxDecimal = 0.13;

       var finalCost = document.getElementById('total');


       if (discountVariable == 0.30) {
          let calculateDiscount = (cartCost *  discountVariable); 
          let priceDiscount = (cartCost - calculateDiscount); 
          let totalTax = priceDiscount * taxDecimal; 
          let totalCost = priceDiscount + totalTax;
          finalCost.innerHTML = "$" + Math.round((totalCost + Number.EPSILON) * 100) / 100;; 
          
       }
       else {
         let totalTax = cartCost * taxDecimal; 
         let totalCost = cartCost + totalTax; 
         finalCost.innerHTML = "$" + Math.round((totalCost + Number.EPSILON) * 100) / 100;;         
       }
       

    }

}

function onLoadCartNumbers() {       // each time we refresh the page, we get the product number in the cart 
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers; 
    }
}

 export function totalCost(product) {  // calculating the total cost 

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
displayOrder(); 
