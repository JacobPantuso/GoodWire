export function cartNumbers(product) {
    
    let productNums = JSON.parse(localStorage.getItem('cartNumbers')); 

    if (productNums) { // if there was already some products in the localStorage
        localStorage.setItem('cartNumbers', productNums + 1); 
        document.querySelector('.cart span').textContent = productNums + 1; 
    }

    else {
        localStorage.setItem('cartNumbers', 1); 
        document.querySelector('.cart span').textContent = 1; 
    }
    set(product)

}

export function initiateCart() {
    if (localStorage.getItem('productsInCart') == undefined) {
        localStorage.setItem('productsInCart', JSON.stringify({}));
    } else if (JSON.stringify(localStorage.getItem('productsInCart')) ==  '"{}"') {
        localStorage.setItem('cartNumbers', 0);
        localStorage.setItem('payments', "{}");
    }
}

export function RemoveFromCart(product) {
    let productNums = JSON.parse(localStorage.getItem('cartNumbers')); 

    if (productNums) {
        localStorage.setItem('cartNumbers', productNums - 1); 
        document.querySelector('.cart span').textContent = productNums - 1; 
    }
    else {
        localStorage.setItem('cartNumbers', 1); 
        document.querySelector('.cart span').textContent = 1; 
    }
    removeItems(product);


}

function set(product) {

   let cartItems = JSON.parse(localStorage.getItem('productsInCart')); 
   
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

export function inCart(product) {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    
    if (cartItems != null) {
        if (cartItems[product.name] != undefined) {
            return true;
        } else {
            return false;
        }
    }
}

function removeItems(product) {
    
    let cartItems = JSON.parse(localStorage.getItem('productsInCart')); 
    var newCart = {};
    
    if (cartItems != null) { // there is already something in the localStorage
        for (var key in cartItems) {
            if (key != product.name) {
                newCart[key] = cartItems[key];
            }
        }
        cartItems = newCart;
        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
        totalCost(product, "true");
    }

}

export function displayCart() {
    let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
    let productContainer = document.querySelector(".cart-products");
    if (JSON.stringify(localStorage.getItem('productsInCart')) !=  '"{}"') {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => { 
            productContainer.innerHTML += `
            <div class="prod-row">
            <div class="left">
                <div class="prod-img">
                    <img src="src/img/${item.imagePath}" alt="">
                </div>
                <div class="prod-info">
                    <h2 id="prodname">${item.name}</h2>
                    <p id="price">Price: $${item.price}</p>
                    <p id="amt">Quantity: 1</p>
                </div>
            </div>
            <div class="right">
                <div class="prod-btns">
                    <button id="${item.imagePath.split('.jpeg')[0]}" class="remove"><i class="fa-solid fa-times-circle"></i></button>
                </div>
            </div>
            </div>
            `
        });
        deleteB();
    }
}

export function displayOrder() {
    let cartCost = JSON.parse(localStorage.getItem("totalCost"));

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
          var calculateDiscount = (cartCost *  discountVariable); 
          let priceDiscount = (cartCost - calculateDiscount); 
          var totalTax = priceDiscount * taxDecimal; 
          let totalCost = priceDiscount + totalTax;
          finalCost.innerHTML = "$" + Math.round((totalCost + Number.EPSILON) * 100) / 100;; 
          
       }
       else {
         let totalTax = cartCost * taxDecimal; 
         let totalCost = cartCost + totalTax; 
         finalCost.innerHTML = "$" + Math.round((totalCost + Number.EPSILON) * 100) / 100;;         
       }
       var payments = {
        "totalCost": cartCost,
        "finalCost": parseInt(finalCost.innerHTML.split('$')[1]),
        "discount": calculateDiscount,
        "tax": totalTax
        };
    }

    localStorage.setItem("payments", JSON.stringify(payments));
}

export function onLoadCartNums() {       // each time we refresh the page, we get the product number in the cart 
    let productNums = localStorage.getItem('cartNumbers');

    if (productNums) {
        document.querySelector('.cart span').textContent = productNums; 
    }
}

 export function totalCost(product, sub) {  // calculating the total cost 

    let cartC = localStorage.getItem('totalCost'); 

    if (sub == "true") {
        cartC = parseInt(cartC);
        localStorage.setItem("totalCost", cartC - product.price);
    } else {
        if (cartC != null) {
            cartC = parseInt(cartC);
           localStorage.setItem("totalCost", cartC + product.price); 
        }
        else {
            localStorage.setItem("totalCost", product.price); 
        }
    }
 } 

 function deleteB() {
    let productNums = JSON.parse(localStorage.getItem('cartNumbers'));
    let deleteBut = document.querySelectorAll('prod-btns fa-solid fa-times-circle');
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));

    for(let i=0; i < deleteBut.length; i++) {
        deleteBut[i].addEventListener('click', () => {
            let nameOfProduct = deleteBut[i]; 
           
            localStorage.setItem('cartNumbers', productNums - cartItems[productName].inCart);
            delete cartItems[nameOfProduct];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNums();
        })
    }
}