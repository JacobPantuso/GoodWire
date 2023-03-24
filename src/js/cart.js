function onModifyCart() {
    console.log("Hey"); 
    cartNumbers(); 

}

let carts = document.querySelectorAll('.addtocart'); 

/*
let products = [
    { name: 'Apple iPhone 14', 
      id: 1,
      price: 1299,
      inCart: 0
    }, 
    { name: 'Samsung Galaxy S23', 
      id: 2,
      price: 999,
      inCart: 0
    }, 
    { name: 'Google Pixel 7', 
      id: 3,
      price: 999,
      inCart: 0
    }, 
    { name: 'Apple iPad Air', 
      id: 4,
      price: 799,
      inCart: 0
    }, 
    { name: 'Samsung Galaxy Tab S', 
      id: 5,
      price: 250,
      inCart: 0
    }, 
    { name: 'Lenovo Tablet P11', 
      id: 6,
      price: 300,
      inCart: 0
    }, 
    { name: 'Apple Macbook Pro', 
      id: 7,
      price: 1800,
      inCart: 0
    }, 
    { name: 'Apple Macbook Air', 
      id: 8,
      price: 1200,
      inCart: 0
    }, 
    { name: 'Dell XPS 13', 
      id: 9,
      price: 1300,
      inCart: 0
    }, 
    { name: 'Apple AirPods Pro', 
      id: 10,
      price: 250,
      inCart: 0
    }, 
    { name: 'Apple AirPods Max', 
      id: 11,
      price: 600,
      inCart: 0
    },
    { name: 'Beats Studio', 
      id: 12,
      price: 300,
      inCart: 0
    }, 
    { name: 'LG 65" Smart TV', 
      id: 13,
      price: 829,
      inCart: 0
    }, 
    { name: 'Sony OLED Smart TV', 
      id: 14,
      price: 2399,
      inCart: 0
    }, 
    { name: 'Samsung Smart TV', 
      id: 15,
      price: 1300,
      inCart: 0
    }, 
    { name: 'Apple Watch', 
      id: 16,
      price: 400,
      inCart: 0
    }, 
    { name: 'Galaxy Watch', 
      id: 17,
      price: 300,
      inCart: 0
    }, 
    { name: 'Pixel Watch', 
      id: 18,
      price: 350,
      inCart: 0
    }
]; 
*/


function cartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers'); 

    productNumbers = parseInt(productNumbers); 

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1); 
    }
    else {
        localStorage.setItem('cartNumbers', 1); 
    }


}

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', onModifyCart); 
}
