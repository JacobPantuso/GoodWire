var products = [];
export class Product {
    constructor(name, id, category, price, imagePath, inCart, tag) {
        this.name = name;
        this.price = price;
        this.id = id;
        this.category = category;
        this.imagePath = imagePath; 
        this.inCart = inCart; 
        this.tag = tag; 
        products.push(this);
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

export function initiateProducts() {
  new Product("Apple iPhone 14",1,"phone", 1299, "iphone14.jpeg", 0, "iphone14");
  new Product("Samsung Galaxy S23",2,"phone", 999, "galaxy.jpeg", 0, "galaxy");
  new Product("Google Pixel 7",3,"phone", 999, "pixel7.jpeg", 0, "pixel7");
  new Product("Apple iPad Air",4,"tablet",799, "ipad.jpeg", 0, "ipad");
  new Product("Samsung Galaxy Tab S",5,"tablet", 250, "samsung_tablet.jpeg", 0, "samsung_tablet");
  new Product("Lenovo Tablet P11",6,"tablet", 300, "lenovo_tablet.jpeg", 0, "lenovo_tablet");
  new Product("Apple Macbook Pro",7,"laptop", 1800, "mac_pro.jpeg", 0,"mac_pro");
  new Product("Apple Macbook Air",8,"laptop", 1200, "mac_air.jpeg", 0, "mac_air");
  new Product('Dell XPS 13"',9,"laptop", 1300, "xps.jpeg", 0, "xps");
  new Product("Apple AirPods Pro",10,"headphones", 250, "airpods_pro.jpeg", 0, "airpods_pro");
  new Product("Apple AirPods Max",11,"headphones", 600, "airpods_max.jpeg", 0, "airpods_max");
  new Product("Beats Studio",12,"headphones", 300, "beats.jpeg", 0, "beats");
  new Product('LG 65" Smart TV',13,"tv", 829, "lg_tv.jpeg", 0, "lg_tv");
  new Product("Sony OLED Smart TV",14,"tv", 2399, "sony.jpeg", 0, "sony");
  new Product("Samsung Smart TV",15,"tv", 1300, "samsung_tv.jpeg", 0, "samsung_tv");
  new Product("Apple Watch",16,"watch", 400, "apple_watch.jpeg", 0,"apple_watch");
  new Product("Galaxy Watch",17,"watch", 300, "samsung_watch.jpeg", 0, "samsung_watch");
  new Product("Pixel Watch",18,"watch", 350, "pixel_watch.jpeg", 0, "pixel_watch");
  return products;
}

export function loadProducts() {
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

/*
const prod0button = document.querySelector('prod0')
const prod1button = document.querySelector('prod1')
const prod2button = document.querySelector('prod2')
const prod3button = document.querySelector('prod3')
const prod4button = document.querySelector('prod4')
const prod5button = document.querySelector('prod5')
const prod6button = document.querySelector('prod6')
const prod7button = document.querySelector('prod7')
const prod8button = document.querySelector('prod8')
const prod9button = document.querySelector('prod9')
const prod10button = document.querySelector('prod10')
const prod11button = document.querySelector('prod11')
const prod12button = document.querySelector('prod12')
const prod13button = document.querySelector('prod13')
const prod14button = document.querySelector('prod14')
const prod15button = document.querySelector('prod15')
const prod16button = document.querySelector('prod16')
const prod17button = document.querySelector('prod17')

prod0button.setAttribute("data-prod0", JSON.stringify(prod0));
prod1button.setAttribute("data-prod1", JSON.stringify(prod1));
prod2button.setAttribute("data-prod2", JSON.stringify(prod2));
prod3button.setAttribute("data-prod3", JSON.stringify(prod3));
prod4button.setAttribute("data-prod4", JSON.stringify(prod4));
prod5button.setAttribute("data-prod5", JSON.stringify(prod5));
prod6button.setAttribute("data-prod6", JSON.stringify(prod6));
prod7button.setAttribute("data-prod7", JSON.stringify(prod7));
prod8button.setAttribute("data-prod8", JSON.stringify(prod8));
prod9button.setAttribute("data-prod9", JSON.stringify(prod9));
prod10button.setAttribute("data-prod10", JSON.stringify(prod10));
prod11button.setAttribute("data-prod11", JSON.stringify(prod11));
prod12button.setAttribute("data-prod12", JSON.stringify(prod12));
prod13button.setAttribute("data-prod13", JSON.stringify(prod13));
prod14button.setAttribute("data-prod14", JSON.stringify(prod14));
prod15button.setAttribute("data-prod15", JSON.stringify(prod15));
prod16button.setAttribute("data-prod16", JSON.stringify(prod16));
prod17button.setAttribute("data-prod17", JSON.stringify(prod17));
*/

// to retrieve the object from the div later, you can use:
// let retrievedObject = JSON.parse(myDiv.getAttribute("data-prodNUMBER"));
// console.log(retrievedObject);
