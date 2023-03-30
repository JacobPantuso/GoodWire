var products = [];
export class Product {
    constructor(name, id, category, price, imagePath, inCart) {
        this.name = name;
        this.price = price;
        this.id = id;
        this.category = category;
        this.imagePath = imagePath; 
        this.inCart = inCart; 
        products.push(this);
      }

      getInCart() {
        return this.inCart;
      }

      getName() {
        return this.name;
      }

      getPrice() {
        return this.price;
      }

      getImagePath() {
        return this.imagePath;
      }

      getId() {
        return this.id;
      }

      getCategory() {
        return this.category;
      }
    
      setName(name) {
        this.name = name;
      }
    
      setPrice(price) {
        this.price = price;
      }

      setId(id) {
        this.id = id;
      }

      setCategory(category){
        this.category = category;
      }
}

export function removeProduct(product) {
  for (var i = 0; i < products.length; i++) {
    if (products[i].getId() == product.getId()) {
      products = products
    }
  }
}

export function initiateProducts() {
  if (products.length != 0) {
    return products;
  }
  new Product("Apple iPhone 14",1,"phone", 1299, "iphone14.jpeg", 0);
  new Product("Samsung Galaxy S23",2,"phone", 999, "galaxy.jpeg", 0);
  new Product("Google Pixel 7",3,"phone", 999, "pixel7.jpeg", 0);
  new Product("Apple iPad Air",4,"tablet",799, "ipad.jpeg", 0);
  new Product("Samsung Galaxy Tab S",5,"tablet", 250, "samsung_tablet.jpeg", 0);
  new Product("Lenovo Tablet P11",6,"tablet", 300, "lenovo_tablet.jpeg", 0);
  new Product("Apple Macbook Pro",7,"laptop", 1800, "mac_pro.jpeg", 0);
  new Product("Apple Macbook Air",8,"laptop", 1200, "mac_air.jpeg", 0);
  new Product('Dell XPS 13"',9,"laptop", 1300, "xps.jpeg", 0);
  new Product("Apple AirPods Pro",10,"headphones", 250, "airpods_pro.jpeg", 0);
  new Product("Apple AirPods Max",11,"headphones", 600, "airpods_max.jpeg", 0);
  new Product("Beats Studio",12,"headphones", 300, "beats.jpeg", 0);
  new Product('LG 65" Smart TV',13,"tv", 829, "lg_tv.jpeg", 0);
  new Product("Sony OLED Smart TV",14,"tv", 2399, "sony.jpeg", 0);
  new Product("Samsung Smart TV",15,"tv", 1300, "samsung_tv.jpeg", 0);
  new Product("Apple Watch",16,"watch", 400, "apple_watch.jpeg", 0);
  new Product("Galaxy Watch",17,"watch", 300, "samsung_watch.jpeg", 0);
  new Product("Pixel Watch",18,"watch", 350, "pixel_watch.jpeg", 0);
  return products;
}

export function JSONToProduct(JSON) {
  var product = new Product(JSON.name, JSON.id, JSON.category, JSON.price, JSON.imagePath, JSON.inCart);
  return product;
}

export function loadProducts() {
  if (!window.location.href.includes("products.html")) { 
    return 'Not on products page'
  }
  var productsDiv = document.getElementById("product-grid");
  // loop through products array and create a div for each product and append it to the productsDiv. Every 3 products create a new row
  var rowDiv = document.createElement("div");
  rowDiv.className = "product-row";
  var productDiv = document.createElement("div");
  productDiv.className = "product";
  var productImage = document.createElement("img");
  productImage.className = "product-image";
  var productName = document.createElement("p");
  productName.className = "product-name";
  var productPrice = document.createElement("p");
  productPrice.className = "product-price";
  var productButton = document.createElement("button");
  productButton.className = "product-button";
  productButton.innerHTML = "Add to cart";
  for (var i = 0; i <= products.length; i++) {
    if (i % 3 == 0 && i != 0) {
      productsDiv.appendChild(rowDiv);
      rowDiv = document.createElement("div");
      rowDiv.className = "product-row";
    }
    if (i == products.length) {
      break;
    }
    productDiv.id = products[i].getImagePath().split(".")[0]
    productImage.src = "src/img/" + products[i].imagePath;
    productName.innerHTML = products[i].name;
    productPrice.innerHTML = "$" + products[i].price;
    productButton.id = "prod" + (i+1);
    productDiv.appendChild(productImage);
    productDiv.appendChild(productName);
    productDiv.appendChild(productPrice);
    productDiv.appendChild(productButton);
    rowDiv.appendChild(productDiv);
    productDiv = document.createElement("div");
    productDiv.className = "product";
    productImage = document.createElement("img");
    productImage.className = "product-image";
    productName = document.createElement("p");
    productName.className = "product-name";
    productPrice = document.createElement("p");
    productPrice.className = "product-price";
    productButton = document.createElement("button");
    productButton.className = "product-button";
    productButton.id = "prod" + (i+1);
    productButton.innerHTML = "Add to Cart";
  }
}