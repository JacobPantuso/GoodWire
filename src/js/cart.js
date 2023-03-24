export function cartNumbers(product) {

    console.log("The product clicked is", product); 
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

export class Cart {
    
    
}


