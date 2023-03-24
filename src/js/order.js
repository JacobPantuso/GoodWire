import * as account from "./account.js";

var orders = [];
export class Order {
    constructor(orderNumber, cart, status, email) {
        this.orderNumber = orderNumber;
        this.orderDate = new Date();
        this.orderDate = this.orderDate.toString();
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

export function newOrder(orderNumber, cart, status, email) {
    if (JSON.parse(sessionStorage.getItem('guest')) == 'true') {
        var order = new Order(orderNumber, cart, status, email);
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        return order;
    } else {
        var res = account.getAccountByName(sessionStorage.getItem('name'));
        var order = new Order(orderNumber, cart, status, email);
        res.addOrder(order);
        orders.push(order);
        return order;
    }
}

export function cancelOrder(orderNumber) {
    if (sessionStorage.getItem('guest') == 'true') {
        var newOrders = [];
        for (var i = 0; i < orders.length; i++) {
            if (orders[i].orderNumber != orderNumber) {
                newOrders.push(orders[i]);
            }
        }
        orders = newOrders;
        localStorage.setItem('orders', JSON.stringify(orders));
    } else if (sessionStorage.getItem('guest') == 'false') {
        var res = account.getAccountByName(sessionStorage.getItem('name'));
        res.removeOrder(getOrder(orderNumber));
    }
}

export function getOrder(orderNumber) {
    for (var i = 0; i < orders.length; i++) {
        if (orders[i].getOrderNumber() == orderNumber) {
            return orders[i];
        }
    }
}

export function receiveStorage() {
    if (sessionStorage.getItem('guest') == 'true') {
        var retrievedOrders = JSON.parse(localStorage.getItem('orders'));
        for (var i = 0; i < retrievedOrders.length; i++) {
            orders.push(new Order(retrievedOrders[i].orderNumber, retrievedOrders[i].cart, retrievedOrders[i].status, retrievedOrders[i].email));
        }
    } else if (sessionStorage.getItem('guest') == 'false') {
        var res = account.getAccountByName(sessionStorage.getItem('name'));
        var newOrders = []
        for (var i = 0; i < res.orders.length; i++) {
            orders.push(new Order(res.orders[i].orderNumber, res.orders[i].cart, res.orders[i].status, res.orders[i].email));
            newOrders.push(new Order(res.orders[i].orderNumber, res.orders[i].cart, res.orders[i].status, res.orders[i].email));
        }
        res.clearOrders();
        for (var i = 0; i < newOrders.length; i++) {
            res.addOrder(newOrders[i]);
        }
        return true
    }
}