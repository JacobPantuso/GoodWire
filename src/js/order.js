import { retrieveObject } from "./account";

var orders = [];
export class Order {
    constructor(orderNumber, cart, status, email) {
        this.orderNumber = orderNumber;
        this.orderDate = new Date();
        this.cart = cart;
        this.status = status;
        this.email = email;
    }

    getOrderNumber() {
        return this.orderNumber;
    }

    // returns formatted date string
    getOrderDate() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return `Placed on ${months[this.orderDate.getMonth]} ${this.orderDate.getDay()}, ${this.orderDate.getFullYear()}}`;
    }

    // needs to be integrated with cart class/product class
    getItems() {
        return this.cart;
    }

    getStatus() {
        return this.status;
    }

}

export function updateOrdersStorage() {
    if (JSON.parse(sessionStorage.getItem('guest'))) {
        localStorage.setItem('order', JSON.stringify(orders));
    } else {
        var account = retrieveObject(email);
        account.addOrder(this);
    }
    // localStorage.setItem('order', JSON.stringify(orders))
}
