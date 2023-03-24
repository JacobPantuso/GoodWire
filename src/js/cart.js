export function cartNumbers(product) {
    
    let productNumbers = localStorage.getItem('cartNumbers'); 

    productNumbers = parseInt(productNumbers); 

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1); 
        document.querySelector('.cart span').textContent = productNumbers + 1; 

    }
    else {
        localStorage.setItem('cartNumbers', 1); 
        document.querySelector('.cart span').textContent = 1; 
    }


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


}
