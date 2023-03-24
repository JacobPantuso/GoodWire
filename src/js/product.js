var products = [];
export class Product {
    constructor(name, id, category, price) {
        this.name = name;
        this.price = price;
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
        this.category = this.category;
      }


    }


//Creating the product objects
const prod0 = new Product(apple_iphone,01,phone, 900)
const prod1 = new Product(samsung_galaxy,02,phone, 800)
const prod2 = new Product(google_pixel,03,phone, 700)
const prod3 = new Product(apple_ipad,04,tablet,400)
const prod4 = new Product(samsung_tablet,05,tablet, 250)
const prod5 = new Product(google_tablet,06,tablet, 300)
const prod6 = new Product(macbook_pro,07,laptop, 1800)
const prod7 = new Product(macbook_air,08,laptop, 1200)
const prod8 = new Product(dell_xps15,09,laptop, 1300)
const prod9 = new Product(airpods_pro,10,headphones, 250)
const prod10 = new Product(airpods_max,11,headphones, 600)
const prod11 = new Product(beats_studio,12,headphones, 300)
const prod12 = new Product(lg_smartTV,13,tv, 600)
const prod13 = new Product(lg_smartTVcurved,14,tv, 800)
const prod14 = new Product(samsung_tv,15,tv, 1300)
const prod15 = new Product(apple_watch,16,watch, 400)
const prod16 = new Product(samsung_watch,17,watch, 300)
const prod17 = new Product(google_watch,18,watch, 350)


//Add to cart button for each product
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

prod0.addEventListener("click", function(){

}