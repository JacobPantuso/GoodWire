var products = [];
export class Product {
    constructor(name, id, category, price, description) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.id = id;
        this.category = category;
        products.push(this);
      }

      getName() {
        return this.name;
      }

      getPrice() {
        return this.price;
      }

      getDescription() {
        return this.description;
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

      setDescription(description) {
        this.description = description;
      }

      setId(id) {
        this.id = id;
      }

      setCategory(category){
        this.category = this.category;
      }


    }

export function addToStorage() {
    localStorage.setItem('products', JSON.stringify(products));
} 

export function receiveStorage() {
    var retrievedProducts = JSON.parse(localStorage.getItem('products'));
    for (var i = 0; i < retrievedProducts.length; i++) {
        new Product(retrievedProducts[i].name, retrievedProducts[i].id, retrievedProducts[i].category, retrievedProducts[i].price, retrievedProducts[i].description)
    }
}

export function retrieveObject(id) {
    for (var i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            return products[i];
        }
    }
}